import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.channel.oio.OioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.oio.OioServerSocketChannel;

import java.net.InetSocketAddress;
import java.nio.charset.Charset;
import java.util.Date;

public class NettyOioServer {

	private void server(int port) throws Exception {
		EventLoopGroup group = new OioEventLoopGroup();
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.group(group)
				.channel(OioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(port))
				.childHandler(new ChannelInitializer<SocketChannel>() {
					@Override
					public void initChannel(SocketChannel ch)
						throws Exception {
						ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
							@Override
							public void channelActive(ChannelHandlerContext ctx) throws Exception {
								final ByteBuf buf = Unpooled.unreleasableBuffer(
									Unpooled.copiedBuffer("\n" + new Date() + " ~ Hi!\n\n", Charset.forName("UTF-8")));
								ctx.writeAndFlush(buf.duplicate()).addListener(ChannelFutureListener.CLOSE);
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
		System.out.println(NettyOioServer.class.getName() + " started and listen on port " + port + " ...");
		new NettyOioServer().server(port);
	}

}

