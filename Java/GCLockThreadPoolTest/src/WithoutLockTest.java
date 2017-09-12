import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

/**
 * Created by lzg on 04/09/2017.
 */
public class WithoutLockTest {

	private static class Counter {
		public volatile int value;
	}

	private static Counter counter = new Counter();

	private static final AtomicIntegerFieldUpdater<Counter> updater = AtomicIntegerFieldUpdater.newUpdater(Counter.class,
		"value");

	public static void main(String[] args) {
		long begin = System.currentTimeMillis();
		ExecutorService executorService = Executors.newFixedThreadPool(4);
		int num = 10000000;
		for(int i = 0; i < num; i++) {
			executorService.execute(new Runnable() {
				@Override
				public void run() {
					int v = incrementAndGet();
					if(v == num) {
						long end = System.currentTimeMillis();
						/*
							MacOSX:
							Without VM options:
							WithoutLockTest ~ value: 10000000  times: 5747ms

							VM options: -Xms3g -Xmx3g -Xmn2g
							WithoutLockTest ~ value: 10000000  times: 1832ms

							Linux:
							Without VM options:
							WithoutLockTest ~ value: 10000000  times: 3209ms

							VM options: -Xms3g -Xmx3g -Xmn2g
							WithoutLockTest ~ value: 10000000  times: 1439ms
						*/
						System.out.println("WithoutLockTest ~ value: " + v + "  times: " + (end - begin) + "ms");
						Scanner in = new Scanner(System.in);
						String s = in.nextLine();
						System.exit(0);
					}
				}
			});
		}

	}

	private static int incrementAndGet() {
		int oldCounter, newCounter;
		for(;;) {
			oldCounter = updater.get(counter);
			newCounter = oldCounter + 1;
			if(updater.compareAndSet(counter, oldCounter, newCounter)) {
				return newCounter;
			}
		}
	}

}

