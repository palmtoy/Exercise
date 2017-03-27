package com.pwrd.redistest;

import redis.clients.jedis.Jedis;

import java.util.Map;
import java.util.Set;

public class RedisHashJava {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		String key = "user";

		String field_name = "name";
		String field_name_value = "palmtoy";
		jedis.hset(key, field_name, field_name_value);

		String field_city = "city";
		String field_city_value = "beijing";
		jedis.hset(key, field_city, field_city_value);

		Map<String, String> map = jedis.hgetAll(key);
		Set<Map.Entry<String,String>> entrySet = map.entrySet();
		for (Map.Entry<String, String> entry : entrySet) {
			System.out.println(entry.getKey() + " : " + entry.getValue());
		}
		/*
		 * 输出
		 * name : palmtoy
		 * city : beijing
		 */
	}
}

