package single;

import java.util.Arrays;
import java.util.List;


public class MyMapReduce {
	public static void main(String args[]) {

		// add 12% tax for every bill
		// old way：
		List<Integer> costBeforeTaxOld = Arrays.asList(100, 200, 300, 400, 500);
		double total = 0;
		for (Integer cost : costBeforeTaxOld) {
			double price = cost + .12*cost;
			total = total + price;
		}
		System.out.println("OLD - Total : " + total);

		// new way：
		List<Integer> costBeforeTaxNew = Arrays.asList(100, 200, 300, 400, 500);
		double bill = costBeforeTaxNew.stream().map(cost -> (cost + .12*cost)).reduce((sum, cost) -> sum + cost).get();
		System.out.println("NEW - Total : " + bill);
	}
}

