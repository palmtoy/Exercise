import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.LengthFieldBasedFrameDecoder;
import io.netty.handler.codec.LengthFieldPrepender;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

import java.net.InetSocketAddress;
import java.nio.charset.Charset;


class NettyClient {
	private static final Charset UTF_8 = Charset.forName("utf-8");
	private ClientHandler clientHandler = new ClientHandler();
	private Bootstrap bootstrap;
	private ChannelFuture future;
	private boolean init = false;
	private boolean isClosed = false;
	private EventLoopGroup workerGroup = null;

	void start() {
		if(init) {
			throw new RuntimeException("client is already started");
		}
		// thread model: one worker thread pool, contains selector thread and workers
		// "1" is ok, we just use "2" here
		workerGroup = new NioEventLoopGroup(2);
		try {
			bootstrap = new Bootstrap();
			bootstrap.group(workerGroup)
				.channel(NioSocketChannel.class) //create SocketChannel transport
				.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
				.handler(new ChannelInitializer<SocketChannel>() {
					@Override
					protected void initChannel(SocketChannel ch) throws Exception {
						ch.pipeline().addLast(new LengthFieldBasedFrameDecoder(10240, 0, 2, 0, 2))
							.addLast(new StringDecoder(UTF_8))
							.addLast(new LengthFieldPrepender(2))
							.addLast(new StringEncoder(UTF_8))
							.addLast(clientHandler); // the same as ServerBootstrap
					}
				});
			// keep the connection with server, and blocking until closed
			future = bootstrap.connect(new InetSocketAddress("127.0.0.1", 18080)).sync();
			init = true;
		} catch (Exception e) {
			isClosed = true;
		} finally {
			if(isClosed) {
				workerGroup.shutdownGracefully();
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
			/*
			// noinspection deprecation
			bootstrap.group().shutdownGracefully();
			*/
		}
		isClosed = true;
	}

	/**
	 * send msg
	 */
	String send(String message) throws Exception {
		if(isClosed || !init) {
			throw new RuntimeException("client has been closed!");
		}
		//send a request call,and blocking until recevie a response from server.
		return clientHandler.call(message, future.channel());
	}

}

