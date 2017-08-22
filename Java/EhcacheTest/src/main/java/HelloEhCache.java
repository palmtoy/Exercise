import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import java.util.Date;

public class HelloEhCache{

	public static void main(String[] args) {

		//1. Create a cache manager
		CacheManager cm = CacheManager.newInstance();

		//cm.addCache("helloCache");

		//2. Get a cache called "helloCache", declared in ehcache.xml
		Cache cache = cm.getCache("helloCache");

		//3. Put few elements in cache
		cache.put(new Element("1", "Jan."));
		cache.put(new Element("2", "Feb."));
		cache.put(new Element("3", "Mar."));

		cache.put(new Element("A", "Monday"));
		cache.put(new Element("B", "Tuesday"));
		cache.put(new Element("C", "Wednesday"));

		//4.1 Get element from cache
		Element ele = cache.get("2");

		//5.1 Print out the element
		String output = (ele == null ? null : ele.getObjectValue().toString());
		System.out.println(new Date() + " ->\n" + output);

		//4.2 Get element from cache
		ele = cache.get("C");

		//5.2 Print out the element
		output = (ele == null ? null : ele.getObjectValue().toString());
		System.out.println(output);

		//6. Is key in cache?
		System.out.println(cache.isKeyInCache("3"));
		System.out.println(cache.isKeyInCache("10"));

		//7. Print cache configuration parameters
		System.out.println("Cache parameters : " + cache);

		//8. shut down the cache manager
		cm.shutdown();

	}

}

