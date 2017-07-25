import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyObject;
import java.io.File;
import java.util.ArrayList;

public class UseGroovyClassLoader {

	public static void main(String[] args){
		int firstNum = 100
			, secondNum = 200;
		GroovyClassLoader groovyClassLoader = new GroovyClassLoader();
		try {
			Class<?> groovyClass = groovyClassLoader.parseClass(new File("./src/main/groovy/script/CalculateMax.groovy"));
			GroovyObject groovyObject = (GroovyObject) groovyClass.newInstance();
			ArrayList<Integer> numbers = new ArrayList<Integer>();
			numbers.add(firstNum);
			numbers.add(secondNum);
			Object[] arguments = {numbers};
			Object value = groovyObject.invokeMethod("getMax", arguments);
			assert value.equals(secondNum);
			System.out.println("Max value is: " + value);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}

