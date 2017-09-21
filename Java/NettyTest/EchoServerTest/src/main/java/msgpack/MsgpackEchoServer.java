package msgpack;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

import java.net.InetSocketAddress;

public class MsgpackEchoServer {

	private final int port;

	private MsgpackEchoServer(int port) {
		this.port = port;
	}
	public static void main(String[] args) throws Exception {
		int port = 9999;
		new MsgpackEchoServer(port).start();
	}

	private void start() throws Exception {
		NioEventLoopGroup group = new NioEventLoopGroup();
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.group(group)
				.channel(NioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(port))
				.childHandler(new ChannelInitializer<SocketChannel>() {
					@Override
					public void initChannel(SocketChannel ch)
						throws Exception {
						ch.pipeline().addLast(
							new MsgpackEchoServerHandler());
					}
				});

			ChannelFuture f = b.bind().sync();
			System.out.println(MsgpackEchoServer.class.getName() + " started and listen on " + f.channel().localAddress());
			f.channel().closeFuture().sync();
		} finally {
			group.shutdownGracefully().sync();
		}
	}

}

