
public class SyncTestClass {
	void test(int idx) {
		synchronized (SyncTestClass.class) {
			System.out.println(idx + " : Test Start ...");
			try {
				Thread.sleep(300);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(idx + " : Test End ...");
		}
	}

	public static void main(String[] args) {
		for (int i = 0; i < 3; i++) {
			Thread thread = new MyThreadClass(i);
			thread.start();
		}
	}
}

class MyThreadClass extends Thread {
	private int idx;

	MyThreadClass(int idx) {
		this.idx = idx;
	}
	public void run() {
		SyncTestClass sync = new SyncTestClass();
		sync.test(idx);
	}
}

