import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.util.CharsetUtil;

import java.net.InetSocketAddress;
import java.util.Date;

public class NettyPipeline {

	private void server(int port) throws Exception {
		NioEventLoopGroup group = new NioEventLoopGroup();
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.group(new NioEventLoopGroup(), new NioEventLoopGroup())
				.channel(NioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(port))
				.childHandler(new ChannelInitializer<SocketChannel>() {
					@Override
					public void initChannel(SocketChannel ch)
						throws Exception {
						ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
							@Override
							public void channelActive(ChannelHandlerContext ctx) throws Exception {
								ChannelPipeline tmpPipeline = ctx.pipeline();
								tmpPipeline
									.writeAndFlush(Unpooled.copiedBuffer("\n" + new Date() + " ~ Hi Foo!\n\n", CharsetUtil.UTF_8))
									.addListener(ChannelFutureListener.CLOSE);
								System.out.println(new Date() + " ~ ctx = " + ctx.toString());
							}
						});
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
		System.out.println(NettyPipeline.class.getName() + " started and listen on port " + port + " ...");
		new NettyPipeline().server(port);
	}

}

