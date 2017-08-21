package single;


import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.ssl.SSLContextBuilder;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.List;

public class ApacheHttpsConnExample {

	public static void main(String[] args) throws Exception {
		ApacheHttpsConnExample httpsObj = new ApacheHttpsConnExample();

		System.out.println("Testing - Send Https GET request ->");
		httpsObj.sendGet();
	}

	// HTTP GET request
	private void sendGet() throws Exception {
		String url = "https://www.baidu.com/";
		CookieStore httpCookieStore = new BasicCookieStore();
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();

		SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
			public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
				return true;
			}
		}).build();
		httpClientBuilder.setSSLContext(sslContext).setDefaultCookieStore(httpCookieStore);

		HostnameVerifier hostnameVerifier = SSLConnectionSocketFactory.getDefaultHostnameVerifier();

		SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslContext, hostnameVerifier);
		Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
			                                                          .register("http", PlainConnectionSocketFactory.getSocketFactory())
			                                                          .register("https", sslSocketFactory)
			                                                          .build();

		// allows multi-threaded use
		PoolingHttpClientConnectionManager connMgr = new PoolingHttpClientConnectionManager( socketFactoryRegistry);
		httpClientBuilder.setConnectionManager( connMgr);

		HttpClient httpClient = httpClientBuilder.build();
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
			System.out.println("<========= Cookie." + ++cookieIdx  + " =========>");
			System.out.println("Cookie Name: " + ck.getName());
			System.out.println("Cookie Content: " + ck.getValue());
			System.out.println("Cookie Domain: " + ck.getDomain());
			System.out.println("Cookie Path: " + ck.getPath());
			System.out.println("Cookie Expires: " + ck.getExpiryDate());
			System.out.println("Cookie protocol version: " + ck.getVersion() + "\n");
		}
	}

}

