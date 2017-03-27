package com.pwrd.redistest;

import redis.clients.jedis.Jedis;

import java.util.Date;

public class RedisPubJava {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		//发布
		String channel = "channel1";
		String message = new Date() + " ~ test publish substribe";
		jedis.publish(channel, message);
	}
}

