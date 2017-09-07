
public class SyncTest {
	synchronized void test(int idx) {
		System.out.println(idx + " : Test Start ...");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(idx + " : Test End ...");
	}

	public static void main(String[] args) {
		for (int i = 0; i < 3; i++) {
			Thread thread = new MyThread(i);
			thread.start();
		}
	}
}

class MyThread extends Thread {
	private int idx;

	MyThread(int idx) {
		this.idx = idx;
	}
	public void run() {
		SyncTest sync = new SyncTest();
		sync.test(idx);
	}
}

