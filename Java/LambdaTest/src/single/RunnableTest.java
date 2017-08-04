package single;

import java.util.Date;

public class RunnableTest implements Runnable {

	public void run() {
		System.out.println(new Date() + " ~ Bar from a thread!");
	}

	public static void main(String args[]) {
		System.out.println(new Date() + " ~ Foo from the main.");
		(new Thread(new RunnableTest())).start();
	}

}
