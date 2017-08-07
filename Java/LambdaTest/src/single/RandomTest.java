package single;

import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class RandomTest {
	public static void main(String args[]) {
		Random seed = new Random();
		Supplier<Integer> random = seed::nextInt;
		Stream.generate(random).limit(3).forEach(System.out::println);
		//Another way
		System.out.println();
		IntStream.generate(() -> (int) (System.nanoTime() % 100)).limit(3).forEach(System.out::println);
	}
}

