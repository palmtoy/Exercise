public class MethodMadness {
	public static void repeat(val){
		for(int i = 0; i < 5; i++){
			println val
		}
	}

	public static void main(String[] args) {
		repeat(new Date().toString() + " ~ Hello World!")
	}
}

