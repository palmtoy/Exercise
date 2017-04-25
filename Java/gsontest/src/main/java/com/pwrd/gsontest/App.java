package com.pwrd.gsontest;

import com.google.gson.Gson;

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
	}

	private class Person {
		public String name;

		public Person(String name) {
			this.name = name;
		}
	}
}

