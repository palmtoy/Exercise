
/**
 * 同步线程
 */
class SyncThreadStatic implements Runnable {
	private static int count;

	private SyncThreadStatic() {
		count = 0;
	}

	private synchronized static void method() {
		for (int i = 0; i < 5; i ++) {
			try {
				System.out.println(Thread.currentThread().getName() + " => " + (count++));
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	public synchronized void run() {
		method();
	}


	public static void main(String[] args) {
		SyncThreadStatic syncThread1 = new SyncThreadStatic();
		SyncThreadStatic syncThread2 = new SyncThreadStatic();
		Thread thread1 = new Thread(syncThread1, "SyncThread1");
		Thread thread2 = new Thread(syncThread2, "SyncThread2");
		thread1.start();
		thread2.start();
	}
}

