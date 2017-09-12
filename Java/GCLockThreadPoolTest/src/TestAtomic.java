
import java.util.concurrent.atomic.AtomicInteger;

// 测试concurrent包下的AtomicInteger
public class TestAtomic {
	// 所有的线程操作同一个对象
	public static AtomicInteger i = new AtomicInteger(0);
	private static int A = 0;
	private static int maxNum = 1000;

	public static void main(String[] args) throws InterruptedException {
		System.out.println("i before: " + TestAtomic.i + ", A before: " + TestAtomic.A);

		Thread t0 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int j = 0; j < maxNum; j++)
				{
					TestAtomic.A++;
					TestAtomic.i.getAndIncrement();
					try {
						Thread.sleep(1);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		});

		Thread t1 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int j = 0; j < maxNum; j++)
				{
					TestAtomic.A--;
					TestAtomic.i.decrementAndGet();
					try {
						Thread.sleep(1);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		});

		t0.start();
		t1.start();
		t0.join();
		t1.join();

		System.out.print("i after : " + TestAtomic.i + ", A after : " + TestAtomic.A);
	}
}

