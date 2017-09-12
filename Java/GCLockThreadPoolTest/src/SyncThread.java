
class SyncThread implements Runnable {
	private static int count;

	private SyncThread() {
		count = 0;
	}

	public void run() {
		synchronized(this) {
			int maxNum = 5;
			for (int i = 0; i < maxNum; i++) {
				try {
					String threadName = Thread.currentThread().getName();
					System.out.println(threadName + " -> " + (count++));
					Thread.sleep(100);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}


	public static void main(String[] args) {
		SyncThread syncThread = new SyncThread();
		Thread thread1 = new Thread(syncThread, "SyncThread_A");
		Thread thread2 = new Thread(syncThread, "SyncThread_B");
		thread1.start();
		thread2.start();
	}
}

