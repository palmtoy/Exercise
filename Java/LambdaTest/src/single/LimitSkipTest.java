package single;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class LimitSkipTest {
	public static void main(String args[]) {
		List<Person> persons = new ArrayList<>();
		for (int i = 1; i <= 10; i++) {
			persons.add(new Person(i, "name-" + i));
		}
		List<String> personList2 = persons.stream().map(Person::getName).limit(6).skip(3).collect(Collectors.toList());
		System.out.println(personList2);
	}

	private static class Person {
		int no;
		private String name;
		public Person (int no, String name) {
			this.no = no;
			this.name = name;
		}
		String getName() {
			System.out.println(name);
			return name;
		}
	}
}



