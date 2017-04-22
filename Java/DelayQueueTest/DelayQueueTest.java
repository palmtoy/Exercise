import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.ThreadLocalRandom;
import java.util.Date;

/**
 * @author palmtoy
 */
public class DelayQueueTest {

	public static void main(String[] args) {
		DelayQueue<DelayedElement> delayQueue = new DelayQueue<DelayedElement>();

		// 生产者
		producer(delayQueue);

		// 消费者
		consumer(delayQueue);

		while (true){
			try {
				TimeUnit.HOURS.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 每100毫秒创建一个对象, 放入延迟队列, 延迟时间1毫秒
	 * @param delayQueue
	 */
	private static void producer(final DelayQueue<DelayedElement> delayQueue){
		new Thread(new Runnable() {
			@Override
			public void run() {
				int i = 0;
				while (true){
					try {
						TimeUnit.MILLISECONDS.sleep(100);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}

					// nextInt is normally exclusive of the top value,
					// so add 1 to make it inclusive
					int delayedTime = ThreadLocalRandom.current().nextInt(1000, 2000 + 1);
					DelayedElement element = new DelayedElement(delayedTime, "test");
					delayQueue.offer(element);
					i++;
					if(i >= 30) break;
				}
			}
		}).start();

		/**
		 * 每秒打印延迟队列中的对象个数
		 */
		new Thread(new Runnable() {
			@Override
			public void run() {
				int maxTestNum = 3, i = 0;

				while (true){
					try {
						TimeUnit.MILLISECONDS.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					int qSize = delayQueue.size();
					System.out.println("\n" + new Date() + " ~ DelayQueue size: " + qSize);
					if(qSize <= 0) {
						i++;
						if(i >= maxTestNum) {
							break;
						}
					}
				}
				System.exit(0);
			}
		}).start();
	}

	/**
	 * 消费者, 从延迟队列中获得数据, 进行处理
	 * @param delayQueue
	 */
	private static void consumer(final DelayQueue<DelayedElement> delayQueue){
		new Thread(new Runnable() {
			@Override
			public void run() {
				int i = 1;
				while (true){
					DelayedElement element = null;
					try {
						element = delayQueue.take();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println("(" + i++ + ") " + System.currentTimeMillis() + " --> " + element);
				}
			}
		}).start();
	}
}


class DelayedElement implements Delayed {
	// 延迟时间
	private final long delay;
	// 到期时间
	private final long expire;
	// 数据
	private final String msg;
	// 创建时间
	private final long startfrom;

	public DelayedElement(long delay, String msg) {
		this.delay = delay;
		this.msg = msg;
		startfrom = System.currentTimeMillis();
		// 到期时间 = 当前时间 + 延迟时间
		expire = startfrom + delay;
	}

	/**
	 * 需要实现的接口, 获得延迟时间: 用过期时间-当前时间
	 * @param unit
	 * @return
	 */
	@Override
	public long getDelay(TimeUnit unit) {
		return unit.convert(this.expire - System.currentTimeMillis() , TimeUnit.MILLISECONDS);
	}

	/**
	 * 用于延迟队列内部比较排序: 当前时间的延迟时间-比较对象的延迟时间
	 * @param o
	 * @return
	 */
	@Override
	public int compareTo(Delayed o) {
		return (int)(this.getDelay(TimeUnit.MILLISECONDS) - o.getDelay(TimeUnit.MILLISECONDS));
	}

	@Override
	public String toString() {
		Date tmpNow = new Date();
		String strTime = String.format("%1$tF %1$tH:%1$tM:%1$tS:", tmpNow) + String.format("%tL", tmpNow);
		final StringBuilder sb = new StringBuilder(strTime + " ~ DelayedElement {");
		sb.append("startfrom=").append(startfrom);
		sb.append(", delay=").append(delay);
		sb.append(", msg='").append(msg).append('\'');
		sb.append(", expire=").append(expire);
		sb.append('}');
		return sb.toString();
	}
}

