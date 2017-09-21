package msgpack;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import org.msgpack.MessagePack;

import java.io.IOException;

@ChannelHandler.Sharable
public class MsgpackEchoClientHandler extends
	SimpleChannelInboundHandler<ByteBuf> {

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws IOException {
		// Serialize
		CSMyMessage msg = new CSMyMessage();
		msg.name = "msgpack from cli";
		msg.version = 0.1;
		MessagePack msgpack = new MessagePack();
		byte[] bytes = msgpack.write(msg);
		ctx.writeAndFlush(Unpooled.copiedBuffer(bytes));
	}

	@Override
	public void channelRead0(ChannelHandlerContext ctx, ByteBuf in) throws IOException {
		// Deserialize
		MessagePack msgpack = new MessagePack();
		SCMyMessage recMsg = msgpack.read(in.nioBuffer(), SCMyMessage.class);
		System.out.println("Client received: recMsg.salaryTab=" + recMsg.salaryTab.toString());
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		cause.printStackTrace();
		ctx.close();
	}
}

