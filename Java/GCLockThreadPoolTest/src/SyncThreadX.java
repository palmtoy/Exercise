
class SyncThreadX implements Runnable {
	private static int count;

	private SyncThreadX() {
		count = 0;
	}

	public void run() {
		synchronized(this) {
			for (int i = 0; i < 5; i++) {
				try {
					String threadName = Thread.currentThread().getName();
					System.out.println(threadName + ": " + (count++));
					Thread.sleep(100);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}


	public static void main(String[] args) {
		Thread thread1 = new Thread(new SyncThreadX(), "SyncThread_C");
		Thread thread2 = new Thread(new SyncThreadX(), "SyncThread_D");
		thread1.start();
		thread2.start();
	}
}

