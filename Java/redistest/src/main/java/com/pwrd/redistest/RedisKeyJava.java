package com.pwrd.redistest;

import redis.clients.jedis.Jedis;

import java.util.HashSet;
import java.util.Iterator;

public class RedisKeyJava {
	public static void main(String[] args) {
		//连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		// 获取数据并输出
		HashSet<String> tmpHset = (HashSet<String>) jedis.keys("*");
		// System.out.println("List of stored keys:: " + tmpHset.toString());
		// System.out.println("List of stored keys:: " + tmpHset);

		// create an iterator
		Iterator iterator = tmpHset.iterator();
		// check values
		for (;iterator.hasNext();){
			System.out.println("A: List of stored keys:: " + iterator.next());
		}

		for (String s : tmpHset) {
			System.out.println("B: List of stored keys:: " + s);
		}
	}
}
