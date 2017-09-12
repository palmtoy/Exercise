
class SyncMethodThread implements Runnable {
	private static int count;

	private SyncMethodThread() {
		count = 0;
	}

	public synchronized void run() {
		for (int i = 0; i < 5; i ++) {
			try {
				System.out.println(Thread.currentThread().getName() + ": " + (count++));
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	public static void main(String[] args) {
		SyncMethodThread syncThread = new SyncMethodThread();
		Thread thread1 = new Thread(syncThread, "SyncThread_1");
		Thread thread2 = new Thread(syncThread, "SyncThread_2");
		thread1.start();
		thread2.start();
	}
}

