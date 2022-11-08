package com.demo.demo_boot_gradle;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import static org.assertj.core.api.Assertions.assertThat;
import com.demo.demo_boot_gradle.Learning.Course;
import com.demo.demo_boot_gradle.Learning.MyProtoMsg;
import com.google.protobuf.Any;

@ExtendWith(SpringExtension.class)
// We create a `@SpringBootTest`, starting an actual server on a `RANDOM_PORT`
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DemoBootGradleApplicationTests {

	// Spring Boot will create a `WebTestClient` for you,
	// already configure and ready to issue requests against "localhost:RANDOM_PORT"
	@Autowired
	private WebTestClient webTestClient;

	@Test
	public void testDemoHello() {
		webTestClient
				// Create a GET request to test an endpoint
				.get().uri("/hello")
				.accept(MediaType.APPLICATION_JSON)
				.exchange()
				// and use the dedicated DSL to test assertions against the response
				.expectStatus().isOk()
				.expectBody(Greeting.class).value(greeting -> {
					assertThat(greeting.getMessage()).isEqualTo("Hello, Spring!");
					System.out.println("Response ~ get hello ↓\n" + greeting.getMessage() + "\n");
				});
	}

	@Test
	public void testPostCourses() {
		Course c = Course.newBuilder().setCourseName("Hello WebFlux").build();
		webTestClient
				.post().uri("/courses/save")
				.contentType(MediaType.APPLICATION_OCTET_STREAM)
				.bodyValue(c)
				.exchange()
				.expectStatus().isOk()
				.expectBody(Course.class).value(course -> {
					System.out.println("Response ~ post course1 ↓\n" + course);
				});
	}

	@Test
	public void testPostCourses2() {
		Course.Builder cBuilder = Course.newBuilder().setCourseName("Hi WebFlux");
		MyProtoMsg.Builder msgBuilder = MyProtoMsg.newBuilder().setStatusCode(2);
		MyProtoMsg msg = msgBuilder.setData(Any.pack(cBuilder.build())).build();
		webTestClient
				.post().uri("/courses/save2")
				.contentType(MediaType.APPLICATION_OCTET_STREAM)
				.bodyValue(msg)
				.exchange()
				.expectStatus().isOk()
				.expectBody(Course.class).value(course -> {
					System.out.println("Response ~ post course2 ↓\n" + course);
				});
	}

	@Test
	public void testDemoCourses() {
		webTestClient
				.get().uri("/courses/9")
				.exchange()
				.expectStatus().isOk()
				.expectBody(Course.class).value(course -> {
					System.out.println("Response ~ get course9 ↓\n" + course);
				});
	}

	@Test
	public void testDelCourse() {
		webTestClient
				.delete().uri("/courses/3")
				.exchange()
				.expectStatus().isOk()
				.expectBody(Greeting.class).value(greeting -> {
					System.out.println("Response ~ del course3 ↓\n" + greeting.getMessage() + "\n");
				});
	}

	@Test
	public void testUpdateCourse() {
		int cId = 6;
		Course.Builder cBuilder = Course.newBuilder().setCourseName("Wow, Mono ~ " + cId);
		MyProtoMsg.Builder msgBuilder = MyProtoMsg.newBuilder().setStatusCode(6);
		MyProtoMsg msg = msgBuilder.setData(Any.pack(cBuilder.build())).build();
		webTestClient
				.put().uri("/courses/" + cId)
				.contentType(MediaType.APPLICATION_OCTET_STREAM)
				.bodyValue(msg)
				.exchange()
				.expectStatus().isOk()
				.expectBody(Course.class).value(course -> {
					System.out.println("Response ~ post course" + cId + " ↓\n" + course);
				});
	}

}
