package com.pwrd.redistest;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

import java.util.Set;


public class RedisTransaction {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		Transaction t = jedis.multi();

		t.set("helloX", "worldX");
		Response<String> result1 = t.get("helloX");

		t.zadd("fooX", 1, "barowitchX");
		t.zadd("fooX", 0, "barinskyX");
		t.zadd("fooX", 2, "barikovievX");

		Response<Set<String>> sose = t.zrange("fooX", 0, -1); // get the entire sortedset

		t.exec(); // don't forget it

		String hw = result1.get(); // use Response.get() to retrieve
		System.out.println("HW = " + hw);

		int soseSize = sose.get().size(); // on sose.get() you can directly

		System.out.println("Sose = " + sose.get());
		System.out.println("SoseSize = " + soseSize);
	}
}

