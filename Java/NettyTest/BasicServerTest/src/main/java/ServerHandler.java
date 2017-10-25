import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import net.sf.json.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;


public class ServerHandler extends SimpleChannelInboundHandler<String> {

	@Override
	public void channelRead0(ChannelHandlerContext ctx, String message) throws Exception {
		System.out.println("\nFrom client: " + message);
		JSONObject json = JSONObject.fromObject(message);
		String source = json.getString("source");

		String md5 = DigestUtils.md5Hex(source);
		// parse to JSON
		json.put("md5Hex",md5);
		// write bytes to socket,and flush(clear) the buffer cache
		ctx.writeAndFlush(json.toString());
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) {
		ctx.flush();
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		cause.printStackTrace();
		ctx.close();
	}
}
