package single;

import org.apache.http.client.CookieStore;
import org.apache.http.client.config.AuthSchemes;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.List;

public class ApacheHttpsCookie {

	public static void main(String[] args) throws Exception {
		ApacheHttpsCookie httpObj = new ApacheHttpsCookie();

		System.out.println("Testing - Send Https GET request");
		httpObj.sendGet();
	}

	// HTTP GET request
	private void sendGet() throws Exception {
		X509TrustManager xtm = new X509TrustManager() {
			@Override
			public void checkClientTrusted(X509Certificate[] arg0, String arg1)
				throws CertificateException {
			}
			@Override
			public void checkServerTrusted(X509Certificate[] arg0, String arg1)
				throws CertificateException {
			}
			@Override
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[]{};
			}
		};

		PoolingHttpClientConnectionManager pcm = null;
		RequestConfig defaultConfig = null;
		try {
			// get TLS safe protocol context
			SSLContext context = SSLContext.getInstance("TLS");
			context.init(null, new TrustManager[]{xtm}, null);
			SSLConnectionSocketFactory scsf = new SSLConnectionSocketFactory(context, NoopHostnameVerifier.INSTANCE);
			defaultConfig = RequestConfig.custom().setCookieSpec(CookieSpecs.STANDARD_STRICT)
				                .setExpectContinueEnabled(true)
				                .setTargetPreferredAuthSchemes(Arrays.asList(AuthSchemes.NTLM, AuthSchemes.DIGEST))
				                .setProxyPreferredAuthSchemes(Arrays.asList(AuthSchemes.BASIC)).build();
			Registry<ConnectionSocketFactory> sfr = RegistryBuilder.<ConnectionSocketFactory>create()
				                                        .register("http", PlainConnectionSocketFactory.INSTANCE)
				                                        .register("https", scsf).build();
			pcm = new PoolingHttpClientConnectionManager(sfr);
		} catch(NoSuchAlgorithmException | KeyManagementException e) {
			e.printStackTrace();
		}

		try {
			String url = "https://www.baidu.com/";
			CookieStore httpCookieStore = new BasicCookieStore();
			CloseableHttpClient closeableHttpClient = HttpClients
				                                          .custom()
				                                          .setConnectionManager(pcm)
				                                          .setDefaultRequestConfig(defaultConfig)
																									.setDefaultCookieStore(httpCookieStore)
				                                          .build();
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse closeableHttpResponse = closeableHttpClient.execute(httpGet);
			System.out.println("\nSending 'GET' request to URL : " + url);
			System.out.println("Response Code : " + closeableHttpResponse.getStatusLine().getStatusCode());
			// System.out.println(EntityUtils.toString(closeableHttpResponse.getEntity()));
			BufferedReader rd = new BufferedReader(new InputStreamReader(closeableHttpResponse.getEntity().getContent()));

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
				System.out.println("<----------------- Cookie." + ++cookieIdx  + " ----------------->");
				System.out.println("Cookie Name: " + ck.getName());
				System.out.println("Cookie Content: " + ck.getValue());
				System.out.println("Cookie Domain: " + ck.getDomain());
				System.out.println("Cookie Path: " + ck.getPath());
				System.out.println("Cookie Expires: " + ck.getExpiryDate());
				System.out.println("Cookie protocol version: " + ck.getVersion() + "\n");
			}

			closeableHttpResponse.close();
			closeableHttpClient.close();
		} catch(IOException e) {
			e.printStackTrace();
		}
	}

}

