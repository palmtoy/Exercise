package com.pwrd.gsontest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Hello world!
 *
 */
public class App
{
	public static void main( String[] args ) {
		Gson g = new Gson();
		Person person = g.fromJson("{\"name\": \"Palmtoy\"}", Person.class);
		System.out.println(person.name); // Palmtoy
		System.out.println(g.toJson(person)); // {"name":"Palmtoy"}

		JsonObject jsonObject = new JsonParser().parse("{\"city\": \"Beijing\"}").getAsJsonObject();
		System.out.println(jsonObject.get("city").getAsString()); // Beijing
	}

	private class Person {
		public String name;

		public Person(String name) {
			this.name = name;
		}
	}
}

