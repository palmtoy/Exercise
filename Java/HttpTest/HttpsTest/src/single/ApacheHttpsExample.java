package single;


import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.List;

public class ApacheHttpsExample {

	public static void main(String[] args) throws Exception {
		ApacheHttpsExample httpsObj = new ApacheHttpsExample();

		System.out.println("Testing - Send Https GET request ->");
		httpsObj.sendGet();
	}

	// HTTP GET request
	private void sendGet() throws Exception {
		String url = "https://www.baidu.com/";
		CookieStore httpCookieStore = new BasicCookieStore();

		SSLContext sslContext = SSLContext.getInstance("SSL");
		// set up a TrustManager that trusts everything
		sslContext.init(null, new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				System.out.println("getAcceptedIssuers ...");
				return null;
			}
			public void checkClientTrusted(X509Certificate[] certs,
			                               String authType) {
				System.out.println("checkClientTrusted ...");
			}
			public void checkServerTrusted(X509Certificate[] certs,
			                               String authType) {
				System.out.println("checkServerTrusted ...");
			}
		} }, new SecureRandom());

		CloseableHttpClient httpClient = HttpClients
			                                 .custom()
			                                 .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
			                                 .setSSLContext(sslContext).setDefaultCookieStore(httpCookieStore)
			                                 .build();
		HttpGet httpGet = new HttpGet(url);

		HttpResponse httpResponse = httpClient.execute(httpGet);
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + httpResponse.getStatusLine().getStatusCode());
		BufferedReader rd = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));

		StringBuilder result = new StringBuilder();
		String line;
		while((line = rd.readLine()) != null) {
			result.append(line);
		}

		System.out.println(result.toString() + "\n");

		List<Cookie> cookies = httpCookieStore.getCookies();
		int cookieIdx = 0;
		//Iterate HttpCookie object
		for(Cookie ck : cookies) {
			System.out.println("========= Cookie." + ++cookieIdx  + " =========");
			System.out.println("Cookie Name: " + ck.getName());
			System.out.println("Cookie Content: " + ck.getValue());
			System.out.println("Cookie Domain: " + ck.getDomain());
			System.out.println("Cookie Path: " + ck.getPath());
			System.out.println("Cookie Expires: " + ck.getExpiryDate());
			System.out.println("Cookie protocol version: " + ck.getVersion() + "\n");
		}
	}

}

