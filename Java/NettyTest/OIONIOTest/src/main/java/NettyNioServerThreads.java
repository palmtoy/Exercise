import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.util.CharsetUtil;

import java.net.InetSocketAddress;
import java.util.Date;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class NettyNioServerThreads {

	private void server(int port) throws Exception {
		NioEventLoopGroup group = new NioEventLoopGroup();
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.group(new NioEventLoopGroup(), new NioEventLoopGroup())
				.channel(NioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(port))
				.childHandler(new ChannelInitializer<SocketChannel>() {
					@Override
					public void initChannel(SocketChannel ch) throws Exception {
						final int[] idx = {0};
						final Channel channelT = ch;

						Runnable writer = new Runnable() {
							@Override
							public void run() {
								int rdm = (int)(Math.random()*100);
								final ByteBuf buf = Unpooled.copiedBuffer(
									"\n" + rdm + " - " + new Date() + " ~ Hello Foo!\n\n", CharsetUtil.UTF_8).retain();
								ChannelFuture cf = channelT.writeAndFlush(buf.duplicate());
								if(++idx[0] == 2) {
									try {
										Thread.sleep(300);
									} catch (InterruptedException e) {
										e.printStackTrace();
									}
									cf.addListener(ChannelFutureListener.CLOSE);
								}
							}
						};

						Executor executor = Executors.newCachedThreadPool();
						executor.execute(writer);
						executor.execute(writer);
					}
				});
			ChannelFuture f = b.bind().sync();
			f.channel().closeFuture().sync();
		} finally {
			group.shutdownGracefully().sync();
		}
	}

	public static void main(String[] args) throws Exception {
		final int port = 9999;
		System.out.println(NettyNioServerThreads.class.getName() + " started and listen on port " + port + " ...");
		new NettyNioServerThreads().server(port);
	}

}

