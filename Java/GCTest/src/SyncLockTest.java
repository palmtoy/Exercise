import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by lzg on 04/09/2017.
 */
public class SyncLockTest {

	private static int value;

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
							SyncLockTest ~ value: 10000000  times: 5913ms

							VM options: -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 1836ms


							Linux:
							Without VM options:
							SyncLockTest ~ value: 10000000  times: 3073ms

							VM options: -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 1839ms
						*/
						System.out.println("SyncLockTest ~ value: " + v + "  times: " + (end - begin) + "ms");
						Scanner in = new Scanner(System.in);
						String s = in.nextLine();
						System.exit(0);
					}
				}
			});
		}

	}

	private static synchronized int incrementAndGet() {
		return ++value;
	}

}

