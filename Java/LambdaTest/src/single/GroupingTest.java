package single;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class GroupingTest {
	public static void main(String args[]) {
		Map<Integer, List<Person>> personGroups = Stream.generate(new PersonSupplier())
			                                          .limit(16)
			                                          .collect(Collectors.groupingBy(Person::getAge));
		Iterator it = personGroups.entrySet().iterator();
		while(it.hasNext()) {
			Map.Entry<Integer, List<Person>> persons = (Map.Entry)it.next();
			System.out.print("Age:" + persons.getKey() + "=> " + persons.getValue().size() + "; ");
		}

		Map<Boolean, List<Person>> children = Stream.generate(new PersonSupplier())
			                                      .limit(36)
			                                      .collect(Collectors.partitioningBy(p -> p.getAge() < 18));
		System.out.println();
		System.out.println("Children number: " + children.get(true).size());
		System.out.println("Adult number: " + children.get(false).size());
	}

	private static class Person {
		int no;
		String name;
		int age;
		public Person(int no, String name, int age) {
			this.no = no;
			this.name = name;
			this.age = age;
		}
		public int getNo() {
			return no;
		}
		String getName() {
			return name;
		}
		public int getAge() {
			return age;
		}
	}

	private static class PersonSupplier implements Supplier<Person> {
		private int index = 0;
		private Random random = new Random();
		@Override
		public Person get() {
			return new Person(++index,"StormTestUser-" + index, random.nextInt(30));
		}
	}
}

