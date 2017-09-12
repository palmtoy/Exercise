
public class SyncTestM {
	void test(int idx) {
		synchronized(this){
			System.out.println(idx + " : Test Start ...");
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(idx + " : Test End ...");
		}
	}

	public static void main(String[] args) {
		for (int i = 0; i < 3; i++) {
			Thread thread = new MyThreadM(i);
			thread.start();
		}
	}
}

class MyThreadM extends Thread {
	private int idx;

	MyThreadM(int idx) {
		this.idx = idx;
	}
	public void run() {
		SyncTestM sync = new SyncTestM();
		sync.test(idx);
	}
}

