package single;

import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

public class ApacheHttpCookie {

	public static void main(String[] args) throws Exception {
		ApacheHttpCookie httpObj = new ApacheHttpCookie();

		System.out.println("Testing - Send Http GET request");
		httpObj.sendGet();
	}

	// HTTP GET request
	private void sendGet() throws Exception {
		String url = "http://www.baidu.com/";

		CookieStore httpCookieStore = new BasicCookieStore();
		HttpClient client = HttpClientBuilder.create().setDefaultCookieStore(httpCookieStore).build();
		HttpGet httpGet = new HttpGet(url);

		// add request header
		String USER_AGENT = "Mozilla/5.0";
		httpGet.addHeader("User-Agent", USER_AGENT);

		HttpResponse response = client.execute(httpGet);

		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());

		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

		StringBuilder result = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}

		System.out.println(result.toString() + "\n");

		List<Cookie> cookies = httpCookieStore.getCookies();
		int cookieIdx = 0;
		//Iterate HttpCookie object
		for (Cookie ck : cookies) {
			System.out.println("------------------ Cookie." + ++cookieIdx  + " ------------------");
			System.out.println("Cookie Name: " + ck.getName());
			System.out.println("Cookie Content: " + ck.getValue());
			System.out.println("Cookie Domain: " + ck.getDomain());
			System.out.println("Cookie Path: " + ck.getPath());
			System.out.println("Cookie Expires: " + ck.getExpiryDate());
			System.out.println("Cookie protocol version: " + ck.getVersion() + "\n");
		}
	}

}

