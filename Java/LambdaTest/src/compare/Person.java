package compare;

import java.util.ArrayList;
import java.util.List;


class Person {
	private String givenName;
	private String surName;

	private Person(String givenName, String surName) {
		this.givenName = givenName;
		this.surName = surName;
	}

	String getSurName() {
		return surName;
	}

	static List<Person> createShortList() {
		List<Person> personList = new ArrayList<>();
		personList.add(new Person("Will", "Lee"));
		personList.add(new Person("Miller", "Zhao"));
		personList.add(new Person("Lucas", "Lu"));
		return personList;
	}

	void printName() {
		System.out.println(givenName + " " + surName);
	}
}

