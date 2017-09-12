import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * Created by lzg on 04/09/2017.
 */
public class HashMapResize {

	public static void main(String[] args) {
		long begin = System.currentTimeMillis();
		int num = 10000000;
		Map<Integer, Integer> map = new HashMap<>();
		for(int i = 0; i < num; i++) {
			map.put(i, i);
		}
		long end = System.currentTimeMillis();
		/*
			Without VM options:
			HashMapResize: 6434ms

			VM options: -Xms3g -Xmx3g -Xmn2g
			HashMapResize: 582ms
		*/
		System.out.println("HashMapResize: " + (end - begin) + "ms");
		Scanner in = new Scanner(System.in);
		String s = in.nextLine();
	}

}

