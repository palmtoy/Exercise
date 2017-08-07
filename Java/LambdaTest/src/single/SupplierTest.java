package single;

import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class SupplierTest {
	public static void main(String args[]) {
		Stream.generate(new PersonSupplier())
			.limit(3)
			.forEach(p -> System.out.println(p.getNo() + ": " + p.getName() + ", " + p.getAge()));
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
			return new Person(++index,"StormTestUser-" + index, random.nextInt(100));
		}
	}
}

