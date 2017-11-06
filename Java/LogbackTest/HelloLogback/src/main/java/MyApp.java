import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Foo {
	static void doIt(){
		Logger fooLogger = LoggerFactory.getLogger(Foo.class.getName());
		fooLogger.debug("Let's do it");
	}
}

public class MyApp {

	final static Logger myLogger = LoggerFactory.getLogger(MyApp.class.getName());

	public static void main(String[] args) {
		System.out.println("IsTraceEnabled: " + myLogger.isTraceEnabled());
		System.out.println("IsDebugEnabled: " + myLogger.isDebugEnabled());
		myLogger.trace("My trace ...");
		myLogger.warn("My warn ...");

		myLogger.info("Before foo ...");
		Foo.doIt();
		myLogger.info("After foo ...");

		try {
			int i = 10 / 0;
		} catch (Exception e) {
			myLogger.error("ErrorTest", e);
		}

	}

}

