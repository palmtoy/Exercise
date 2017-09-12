public class VolatileTest {
	// private boolean running = true;
	private volatile boolean running = true;

	private void test() {
		new Thread(new Runnable() {
			public void run() {
				int counter = 0;
				while (running) {
					counter++;
				}
				System.out.println("Thread 1 finished, counter = " + counter);
			}
		}).start();

		new Thread(new Runnable() {
			public void run() {
				// Sleep for a bit so that thread 1 has a chance to start
				try {
					Thread.sleep(10);
				} catch (InterruptedException ignored) {}
				running = false;
				System.out.println("Thread 2 finished.\n");
			}
		}).start();
	}

	public static void main(String[] args) {
		new VolatileTest().test();
	}
}

