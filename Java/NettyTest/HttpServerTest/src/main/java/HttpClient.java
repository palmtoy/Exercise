import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.*;

import java.net.URI;
import java.util.Date;

public class HttpClient {
	private void connect(String host, int port) throws Exception {
		EventLoopGroup workerGroup = new NioEventLoopGroup();

		try {
			Bootstrap b = new Bootstrap();
			b.group(workerGroup);
			b.channel(NioSocketChannel.class);
			b.option(ChannelOption.SO_KEEPALIVE, true);
			b.handler(new ChannelInitializer<SocketChannel>() {
				@Override
				public void initChannel(SocketChannel ch) throws Exception {
					// add HttpResponseDecoder
					ch.pipeline().addLast(new HttpResponseDecoder());
					// add HttpRequestEncoder
					ch.pipeline().addLast(new HttpRequestEncoder());
					ch.pipeline().addLast(new HttpClientInboundHandler());
				}
			});

			// Start the client.
			ChannelFuture f = b.connect(host, port).sync();

			URI uri = new URI("http://" + host + ":" + port);
			String msg = new Date() + " ~ Hello, netty http client here!";
			DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET,
				uri.toASCIIString(), Unpooled.wrappedBuffer(msg.getBytes("UTF-8")));

			// build http request
			request.headers().set("Host", host);
			request.headers().set("Connection", "keep-alive");
			request.headers().set("Content-Length", request.content().readableBytes());
			// send http request
			f.channel().write(request);
			f.channel().flush();
			f.channel().closeFuture().sync();
		} finally {
			workerGroup.shutdownGracefully();
		}

	}

	public static void main(String[] args) throws Exception {
		HttpClient client = new HttpClient();
		final int port = 9999;
		client.connect("localhost", port);
	}
}

