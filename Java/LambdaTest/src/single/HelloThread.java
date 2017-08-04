package single;

import java.util.Date;

/**
 * Created by lzg on 03/08/2017.
 */
public class HelloThread extends Thread{

	public void run() {
		System.out.println(new Date() + " ~ World from a thread!");
	}

	public static void main(String args[]) {
		System.out.println(new Date() + " ~ Hello from the main.");
		(new HelloThread()).start();
	}

}
