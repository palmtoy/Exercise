package com.pwrd.redistest;

import redis.clients.jedis.Jedis;

import java.util.Set;

public class RedisSetJava {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		String key = "set_key";
		String[] members = new String[] {"a", "b", "a", "c", "d", "a"};
		jedis.sadd(key, members);

		Set<String> smembers = jedis.smembers(key);
		for (String str : smembers) {
			System.out.println(str);
		}
	}
}

