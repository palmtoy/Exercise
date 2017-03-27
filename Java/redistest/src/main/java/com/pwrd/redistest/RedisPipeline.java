package com.pwrd.redistest;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.Response;

import java.util.Set;


public class RedisPipeline {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		Pipeline p = jedis.pipelined();

		p.set("fool", "bar");
		p.zadd("foo", 1,"barowitch");
		p.zadd("foo", 0, "barinsky");
		p.zadd("foo", 0, "barikoviev");

		Response<String> pipeString = p.get("fool");

		Response<Set<String>> sose = p.zrange("foo", 0, -1);
		p.sync();

		System.out.println("PipeString = " + pipeString);

		Integer soseSize = sose.get().size();
		Set<String> setBack = sose.get();

		System.out.println("SoseSize = " + soseSize);
		System.out.println("SetBack = " + setBack);
	}
}

