import java.util.ArrayList;
import java.util.List;

public class ChaosConcurrentTest {

	static List<Integer> numberList = new ArrayList<>();

	public static class AddToList implements Runnable {
		int startnum = 0;
		AddToList(int startnumber) {
			startnum = startnumber;
		}
		@Override
		public void run() {
			synchronized(AddToList.class) {
			// synchronized(this) {
				int count = 0;
				while (count < 1000000) {
					numberList.add(startnum);
					startnum += 2;
					count++;
				}
			}
		}
	}

	public static void main(String[] args) {
		Thread t1 = new Thread(new AddToList(0));
		Thread t2 = new Thread(new AddToList(1));
		t1.start();
		t2.start();
		while(t1.isAlive() || t2.isAlive()){
			try {
				Thread.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.println("\nNumberList Size = " + numberList.size());
		System.out.println("\nNumberList[last-one] = " + numberList.get(numberList.size()-1));
	}

}

