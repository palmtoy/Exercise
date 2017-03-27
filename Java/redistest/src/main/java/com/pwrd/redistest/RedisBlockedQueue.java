package com.pwrd.redistest;

import redis.clients.jedis.Jedis;
import java.util.List;


public class RedisBlockedQueue {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		List<String> brpop = jedis.brpop(0,"tmp_queue");
		for (String string : brpop) {
			System.out.println(string);
		}
	}
}

