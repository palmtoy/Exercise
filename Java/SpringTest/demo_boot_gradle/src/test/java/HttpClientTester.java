import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import com.demo.demo_boot_gradle.Learning.Course;

public class HttpClientTester {

  public static void main(String[] args) throws Exception {
    httpPostRequest();
  }

  public static void httpPostRequest() throws URISyntaxException, IOException, InterruptedException {
    HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .build();
		Course c = Course.newBuilder().setCourseName("Hello WebFlux").build();
    HttpRequest request = HttpRequest.newBuilder(new URI("http://localhost:8080/courses/save"))
        .version(HttpClient.Version.HTTP_1_1)
        .POST(BodyPublishers.ofByteArray(c.toByteArray()))
        .build();
    HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		System.out.println("Response ~ course ↓\n" + response.body());
  }

}
