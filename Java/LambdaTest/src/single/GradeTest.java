package single;

import java.util.stream.Stream;

public class GradeTest {
	public static void main(String args[]) {
		Stream.iterate(0, n -> n + 2)
			.limit(6)
			.forEach(x -> System.out.print(x + " "));
	}
}

