package com.pwrd.redistest;

import redis.clients.jedis.Jedis;


public class RedisLpush {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		jedis.lpush("tmp_queue", "queue_message1", "queue_message2");
	}
}

