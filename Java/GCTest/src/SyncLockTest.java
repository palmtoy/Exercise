import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by lzg on 04/09/2017.
 */
public class SyncLockTest {

	private static int value;
	private static int threadNum = 4;
	private static int[] cntArray = new int[threadNum];

	public static void main(String[] args) {
		String mainThreadName = Thread.currentThread().getName();
		System.out.println("MainThreadName = " + mainThreadName + "\n");
		long begin = System.currentTimeMillis();
		ExecutorService executorService = Executors.newFixedThreadPool(threadNum);
		int num = 10000000;
		for(int i = 0; i < num; i++) {
			executorService.execute(new Runnable() {
				@Override
				public void run() {
					int v = 0;
					try {
						v = incrementAndGet();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					if(v == num) {
						long end = System.currentTimeMillis();
						/*
							MacOSX:
							Without VM options:
							SyncLockTest ~ value: 10000000  times: 5913ms

							VM options: -XX:-UseBiasedLocking -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 1933ms
							CntArray =[2427774, 2559846, 2595576, 2416804]

							VM options: -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 2012ms
							CntArray =[2512125, 2493540, 2555175, 2439160]


							Linux:
							Without VM options:
							SyncLockTest ~ value: 10000000  times: 3073ms

							VM options: -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 1839ms

							VM options: -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -Xms3g -Xmx3g -Xmn2g
							SyncLockTest ~ value: 10000000  times: 1482ms
							CntArray =[2590096, 2275418, 2208938, 2925548]
						*/
						System.out.println("SyncLockTest ~ value: " + v + "  times: " + (end - begin) + "ms\n");
						System.out.println("CntArray =" + Arrays.toString(cntArray));
						System.exit(0);
					}
				}
			});
		}

	}

	private static synchronized int incrementAndGet() throws InterruptedException {
		String threadName = Thread.currentThread().getName();
		if(value % 2000000 == 0) {
			System.out.println("IncrementAndGet ~ ThreadName = " + threadName);
			System.out.println("IncrementAndGet ~ value = " + value + "\n");
		}
		String tmp = threadName.substring(threadName.length()-1);
		int idx = Integer.parseInt(tmp);
		cntArray[idx-1]++;
		Thread.sleep(1);
		return ++value;
	}

}

