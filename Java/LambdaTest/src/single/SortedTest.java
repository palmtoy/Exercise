package single;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SortedTest {
	public static void main(String args[]) {
		List<Person> persons = new ArrayList<>();
		for (int i = 5; i >= 1; i--) {
			persons.add(new Person(i, "name-" + i));
		}
		List<Person> personList2 = persons.stream()
			                           .sorted(Comparator.comparing(Person::getName))
			                           .limit(2)
			                           .collect(Collectors.toList());
		System.out.println();
		personList2.stream()
			.map(Person::getNo)
			.forEach(System.out::println);

		System.out.println();
		List<Person> personList3 = persons.stream()
			                           .limit(2)
			                           .sorted(Comparator.comparing(Person::getName))
			                           .collect(Collectors.toList());
		System.out.println();
		personList3.stream()
			.map(Person::getNo)
			.forEach(System.out::println);
	}

	private static class Person {
		int no;
		private String name;
		public Person (int no, String name) {
			this.no = no;
			this.name = name;
		}
		String getName() {
			System.out.print(name + " ");
			return name;
		}
		int getNo() {
			return no;
		}
	}
}



