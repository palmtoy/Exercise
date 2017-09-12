import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class AtomicIntegerFieldUpdaterCounter {
	// 步骤1: 构造方法
	private static final AtomicIntegerFieldUpdater<Details> atomicIntegerFieldUpdater
		= AtomicIntegerFieldUpdater.newUpdater(Details.class, "numberTimesInvoked");

	// 步骤2: 对AtomicIntegerFieldUpdater修饰的变量进行操作
	private int addOne(Details details) {
		return atomicIntegerFieldUpdater.getAndIncrement(details);
	}

	private int subOne(Details details) {
		return atomicIntegerFieldUpdater.decrementAndGet(details);
	}

	public static void main(String[] args) throws InterruptedException {
		final AtomicIntegerFieldUpdaterCounter atomicIntegerFieldUpdaterCounter
			= new AtomicIntegerFieldUpdaterCounter();

		int maxNum = 100000;

		// This call would ordinarily be made by many other threads
		final Details d = new Details();
		System.out.println("对象d 的 变量numberTimesInvoked 累计前: " + d.getNumberTimesInvoked());
		System.out.println("对象d 的 变量A 累计前: " + Details.A + "\n");

		Thread t0 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int j = 0; j < maxNum; j++) {
					atomicIntegerFieldUpdaterCounter.addOne(d);
					Details.A++;
				}
			}
		});

		Thread t1 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int j = 0; j < maxNum; j++) {
					atomicIntegerFieldUpdaterCounter.subOne(d);
					Details.A--;
				}
			}
		});

		t0.start();
		t1.start();
		t0.join();
		t1.join();

		System.out.println("对象d 的 变量numberTimesInvoked 累计后: " + d.getNumberTimesInvoked());
		System.out.println("对象d 的 变量A 累计后: " + Details.A);
	}
}


class Details {
	volatile int numberTimesInvoked;
	static int A = 0;

	int getNumberTimesInvoked() {
		return numberTimesInvoked;
	}
}

