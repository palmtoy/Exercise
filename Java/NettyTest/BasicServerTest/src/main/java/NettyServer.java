import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.LengthFieldBasedFrameDecoder;
import io.netty.handler.codec.LengthFieldPrepender;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

import java.nio.charset.Charset;


class NettyServer {
	private static final Charset UTF_8 = Charset.forName("utf-8");
	private ChannelFuture future;
	private boolean isClosed = false;
	private boolean init = false;
	private ServerBootstrap bootstrap;
	private EventLoopGroup bossGroup = null;
	private EventLoopGroup workerGroup = null;

	void start() {
		int iPort = 18080;
		if(init) {
			throw new RuntimeException("Client is already started!");
		}
		// thread model: one selector thread，and one worker thread pool
		// more than 1 is not needed
		bossGroup = new NioEventLoopGroup(1);
		workerGroup = new NioEventLoopGroup(Runtime.getRuntime().availableProcessors() - 1);
		try {
			// create ServerSocket transport
			bootstrap = new ServerBootstrap();
			bootstrap.group(bossGroup, workerGroup)
				.channel(NioServerSocketChannel.class)
				.childHandler(new ChannelInitializer<SocketChannel>() {
					@Override
					protected void initChannel(SocketChannel ch) throws Exception {
						ch.pipeline().addLast(new LengthFieldBasedFrameDecoder(10240, 0, 2, 0, 2))
							.addLast(new StringDecoder(UTF_8))
							.addLast(new LengthFieldPrepender(2))
							.addLast(new StringEncoder(UTF_8))
							.addLast(new ServerHandler());
					}
				}).childOption(ChannelOption.TCP_NODELAY, true);
			future = bootstrap.bind(iPort).sync();
			init = true;
			System.out.println("Netty server is listening on port " + iPort + " ...");
		} catch (Exception e) {
			isClosed = true;
		} finally {
			if(isClosed) {
				workerGroup.shutdownGracefully();
				bossGroup.shutdownGracefully();
				System.out.println("Netty server is closing ...");
			}
		}
	}


	void close() {
		if(isClosed) {
			return;
		}
		try {
			future.channel().close();
		} finally {
			workerGroup.shutdownGracefully();
			bossGroup.shutdownGracefully();
			/*
			// noinspection deprecation
			bootstrap.childGroup().shutdownGracefully();
			// noinspection deprecation
			bootstrap.group().shutdownGracefully();
			*/
		}
		isClosed = true;
		System.out.println("Netty server closed.");
	}

}

