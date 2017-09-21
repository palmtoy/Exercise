package msgpack;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import org.msgpack.MessagePack;

import java.io.IOException;
import java.util.HashMap;

@ChannelHandler.Sharable
public class MsgpackEchoServerHandler extends
	ChannelInboundHandlerAdapter {

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws IOException {
		// Deserialize
		MessagePack msgpack = new MessagePack();
		CSMyMessage recMsg = msgpack.read(((ByteBuf)msg).nioBuffer(), CSMyMessage.class);
		System.out.println("Server received: recMsg={name=\"" + recMsg.name + "\", version=" + recMsg.version + "}");

		// Serialize
		SCMyMessage retMsg = new SCMyMessage();
		retMsg.salaryTab = new HashMap<String, Integer>();
		retMsg.salaryTab.put("Lucas", 15000);
		retMsg.salaryTab.put("Cook", 20000);
		retMsg.salaryTab.put("Jobs", 30000);
		byte[] bytes = msgpack.write(retMsg);
		ctx.write(Unpooled.copiedBuffer(bytes));
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)
			.addListener(ChannelFutureListener.CLOSE);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		cause.printStackTrace();
		ctx.close();
	}
}


