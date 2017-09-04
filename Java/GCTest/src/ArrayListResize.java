import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Created by lzg on 04/09/2017.
 */
public class ArrayListResize {

	public static void main(String[] args) {
		long begin = System.currentTimeMillis();
		int num = 10000000;
		List<Integer> list = new ArrayList<>();
		for(int i = 0; i < num; i++) {
			list.add(i);
		}
		long end = System.currentTimeMillis();
		/*
			Without VM options:
			ArrayListResize: 2178ms

			VM options: -Xms2048m -Xmx2048m -Xmn1024m
			ArrayListResize: 247ms
		*/
		System.out.println("ArrayListResize: " + (end - begin) + "ms");
		Scanner in = new Scanner(System.in);
		String s = in.nextLine();
	}

}

