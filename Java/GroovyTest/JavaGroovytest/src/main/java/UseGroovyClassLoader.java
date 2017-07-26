import groovy.lang.GroovyClassLoader;
import java.io.File;
import java.util.Date;

public class UseGroovyClassLoader {
	private static IMyInterface myImplObj = new MyImpl();
	private static GroovyClassLoader groovyClassLoader = new GroovyClassLoader();

	public static void main(String[] args) {
		try {
			String myStr = new Date() + " - Foo bar ...";
			myImplObj.MyPrint(myStr);

			String scriptPath = "./src/main/groovy/script/";
			Class<?> groovyClass = groovyClassLoader.parseClass(new File(scriptPath + "MyImplV2.groovy"));
			myImplObj = (IMyInterface) groovyClass.newInstance();
			myImplObj.MyPrint(myStr);

			groovyClass = groovyClassLoader.parseClass(new File(scriptPath + "MyImplV3.groovy"));
			myImplObj = (IMyInterface) groovyClass.newInstance();
			myImplObj.MyPrint(myStr);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}

