import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class CachedThreadPoolTest {
	public static void main(String[] args) {
		int nThreads = 5;
		ExecutorService executorService = Executors.newCachedThreadPool();
		// ExecutorService executorService = Executors.newFixedThreadPool(nThreads);
		// ExecutorService executorService = Executors.newSingleThreadExecutor();
		for (int i = 0; i < nThreads; i++) {
			executorService.execute(new TestRunnable());
			System.out.println("************* a" + i + " *************");
		}
		executorService.shutdown();
	}
}

class TestRunnable implements Runnable {
	public void run() {
		System.out.println(Thread.currentThread().getName() + " is running...");
	}
}

