package com.violetgo.example.netty.helloworld;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

@Sharable
public class EchoServerHandler extends ChannelInboundHandlerAdapter {

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {
		//这个方法会在每次client有输入的时候调用
		ByteBuf buffer = ctx.alloc().buffer();
		buffer.writeBytes("hello World".getBytes());
		ctx.write (buffer);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) {
		//这个方法会在每次client有输入完成的时候调用
		ctx.flush();
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		cause.printStackTrace();
		ctx.close();
	}
}
