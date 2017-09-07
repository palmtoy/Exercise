
public class SyncTestSingleObj {
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
		SyncTestSingleObj sync = new SyncTestSingleObj();
		for (int i = 0; i < 3; i++) {
			Thread thread = new MyThreadSingle(i, sync);
			thread.start();
		}
	}
}

class MyThreadSingle extends Thread {
	private int idx;
	private SyncTestSingleObj sync;

	MyThreadSingle(int idx, SyncTestSingleObj sync) {
		this.idx = idx;
		this.sync = sync;
	}
	public void run() {
		sync.test(idx);
	}
}

