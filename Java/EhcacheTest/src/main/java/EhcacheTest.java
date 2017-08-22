import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import java.util.Date;


public class EhcacheTest {

	public static void main( String args[] ) {

		// Create a cache manager
		final CacheManager cacheManager = new CacheManager();

		// create the cache called "hello-world"
		final Cache cache = cacheManager.getCache("hello-world");

		// create a key to map the data to
		final String key = "greeting";

		// Create a data element
		final Element putGreeting = new Element(key, "Hello, World!");

		// Put the element into the data store
		cache.put(putGreeting);

		// Retrieve the data element
		final Element getGreeting = cache.get(key);

		// Print the value
		System.out.println(new Date() + " ->\n" + getGreeting.getObjectValue());

		cacheManager.shutdown();
	}

}

