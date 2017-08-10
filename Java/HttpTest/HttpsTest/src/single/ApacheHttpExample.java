package single;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class ApacheHttpExample {

	private final String USER_AGENT = "Mozilla/5.0";

	public static void main(String[] args) throws Exception {
		ApacheHttpExample httpObj = new ApacheHttpExample();

		System.out.println("Testing 1 - Send Http GET request");
		httpObj.sendGet();

		System.out.println("\nTesting 2 - Send Http POST request");
		httpObj.sendPost();
	}

	// HTTP GET request
	private void sendGet() throws Exception {
		String url = "http://localhost:3000/hi";

		HttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet(url);

		// add request header
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
	}

	// HTTP POST request
	private void sendPost() throws Exception {
		String url = "http://localhost:3000/wow";

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(url);

		// add header
		httpPost.setHeader("User-Agent", USER_AGENT);

		List<NameValuePair> urlParameters = new ArrayList<>();
		urlParameters.add(new BasicNameValuePair("city", "BJ"));
		urlParameters.add(new BasicNameValuePair("sn", "61US6"));
		urlParameters.add(new BasicNameValuePair("num", "1"));

		httpPost.setEntity(new UrlEncodedFormEntity(urlParameters));

		HttpResponse response = client.execute(httpPost);
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + httpPost.getEntity());
		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());

		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

		StringBuilder result = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}

		System.out.println(result.toString());
	}

}

