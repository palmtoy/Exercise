package com.pwrd.redistest;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;


public class RedisSubJava {
	public static void main(String[] args) {
		//订阅: 需要先执行订阅操作
		//覆盖JedisPubSub中的onMessage, 用于回调

		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		JedisPubSub jedisPubSub = new JedisPubSub() {
			@Override
			public void onMessage(String channel, String message) {
				System.out.println(channel + " : " + message);
			}
		};

		jedis.subscribe(jedisPubSub, "channel1");
	}
}


