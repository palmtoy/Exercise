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

public class NettyNioServerX {

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
						Channel channelX = ch;
						ByteBuf buf = Unpooled.copiedBuffer("\n" + new Date() + " ~ Hi Bar!\n\n", CharsetUtil.UTF_8);
						ChannelFuture cf = channelX.writeAndFlush(buf);
						cf.addListener(new ChannelFutureListener() {
							@Override
							public void operationComplete(ChannelFuture future) {
								if (future.isSuccess()) {
									System.out.println(new Date() + " ~ Write successful.");
								} else {
									System.err.println(new Date() + " ~ Write error.");
									future.cause().printStackTrace();
								}
							}
						}).addListener(ChannelFutureListener.CLOSE);
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
		System.out.println(NettyNioServerX.class.getName() + " started and listen on port " + port + " ...");
		new NettyNioServerX().server(port);
	}

}

