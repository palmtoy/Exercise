package com.pwrd.redistest;

import redis.clients.jedis.Jedis;
import java.util.List;


public class RedisBlockedQ2 {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		while (true) {
			List<String> brpop = jedis.brpop(0,"tmp_queue");
			for (String string : brpop) {
				System.out.println(string);
			}
		}
	}
}

