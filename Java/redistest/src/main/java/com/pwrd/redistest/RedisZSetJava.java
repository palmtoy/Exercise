package com.pwrd.redistest;

import redis.clients.jedis.Jedis;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class RedisZSetJava {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		String key = "zset_key";
		Map<String, Double> scoreMembers = new HashMap<String, Double>() {{
			put("beijing", 100.0);
			put("shanghai", 200.0);
		}};
		jedis.zadd(key, scoreMembers);

		Set<String> zrange = jedis.zrange(key, 0, 2);

		for (String member : zrange) {
			System.out.println(member);
			System.out.println(jedis.zscore(key, member));
		}
	}
}

