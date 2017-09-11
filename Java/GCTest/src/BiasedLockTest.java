import java.util.List;
import java.util.Vector;

/**
 * Created by lzg on 11/09/2017.
 */
public class BiasedLockTest {
	private static List<Integer> tmpList = new Vector<>();

	public static void main(String[] args) {
		long tsStart = System.currentTimeMillis();
		for (int i = 0; i < 10000000; i++) {
			tmpList.add(i);
		}
		/*
			MacOSX:
			VM options: -XX:-UseBiasedLocking -Xms3g -Xmx3g -Xmn2g
			BiasedLockTest ~ Cost：354 ms

			VM options: -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -Xms3g -Xmx3g -Xmn2g
			BiasedLockTest ~ Cost：182 ms
		*/

		System.out.println("BiasedLockTest ~ Cost：" + (System.currentTimeMillis() - tsStart) + " ms");
	}
}

