import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Date;

import static io.netty.handler.codec.http.HttpHeaders.Names.*;
import static io.netty.handler.codec.http.HttpResponseStatus.OK;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;

public class HttpServerInboundHandler extends ChannelInboundHandlerAdapter {

	private static Log log = LogFactory.getLog(HttpServerInboundHandler.class);

	private HttpRequest request;

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg)
		throws Exception {
		String now = new Date() + " ~ ";
		if (msg instanceof HttpRequest) {
			request = (HttpRequest) msg;
			String uri = request.uri();
			System.out.println(now + "Uri: " + uri);
		}
		if (msg instanceof HttpContent) {
			HttpContent content = (HttpContent) msg;
			ByteBuf buf = content.content();
			System.out.println(buf.toString(io.netty.util.CharsetUtil.UTF_8));
			buf.release();

			String res = now + "Hi, netty http server here!";
			FullHttpResponse response = new DefaultFullHttpResponse(
				HTTP_1_1, OK, Unpooled.wrappedBuffer(res.getBytes("UTF-8")));
			response.headers().set(CONTENT_TYPE, "text/plain");
			response.headers().set(CONTENT_LENGTH,
				response.content().readableBytes());
			if (HttpUtil.isKeepAlive(request)) {
				response.headers().set(CONNECTION, "keep-alive");
			}
			ctx.write(response);
			ctx.flush();
		}
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)
			.addListener(ChannelFutureListener.CLOSE);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		log.error(cause.getMessage());
		ctx.close();
	}

}

