import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Created by lzg on 04/09/2017.
 */
public class ArrayListFixed {

	public static void main(String[] args) {
		long begin = System.currentTimeMillis();
		int num = 10000000;
		List<Integer> list = new ArrayList<>(num);
		for(int i = 0; i < num; i++) {
			list.add(i);
		}
		long end = System.currentTimeMillis();
		/*
			Without VM options:
			ArrayListFixed: 2343ms

			VM options: -Xms2g -Xmx2g -Xmn1g
			ArrayListFixed: 135ms
		*/
		System.out.println("ArrayListFixed: " + (end - begin) + "ms");
		Scanner in = new Scanner(System.in);
		String s = in.nextLine();
	}

}

