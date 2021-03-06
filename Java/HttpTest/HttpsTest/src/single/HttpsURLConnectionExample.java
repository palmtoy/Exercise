package single;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;

/*
	$ sudo keytool -import -alias myself_signed -keystore $JAVA_HOME/jre/lib/security/cacerts -file ./ssl/agent2-cert.pem
		You will be asked for password which default is: `changeit`

	$ sudo keytool -delete -alias myself_signed -keystore $JAVA_HOME/jre/lib/security/cacerts
 */
public class HttpsURLConnectionExample {
	private final String USER_AGENT = "Mozilla/5.0";

	public static void main(String[] args) throws Exception {
		HttpsURLConnectionExample httpsObj = new HttpsURLConnectionExample();

		System.out.println("Testing 1 - Send Https GET request ->");
		httpsObj.sendGet();

		System.out.println("\nTesting 2 - Send Https POST request ->");
		httpsObj.sendPost();
	}

		// HTTP GET request
	private void sendGet() throws Exception {
		String url = "https://localhost:3000/hi";
		URL obj = new URL(url);
		HttpsURLConnection.setDefaultHostnameVerifier ((hostname, session) -> true);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("User-Agent", USER_AGENT);

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuilder response = new StringBuilder();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString() + "\n");
	}


	// HTTP POST request
	private void sendPost() throws Exception {
		String url = "https://localhost:3000/wow";
		URL obj = new URL(url);
		// HttpsURLConnection.setDefaultHostnameVerifier ((hostname, session) -> true);
		HttpsURLConnection.setDefaultHostnameVerifier((hostname, sslSession) -> hostname.equals("localhost"));
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

		String urlParameters = "user=will";

		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + urlParameters);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuilder response = new StringBuilder();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());
	}

}

