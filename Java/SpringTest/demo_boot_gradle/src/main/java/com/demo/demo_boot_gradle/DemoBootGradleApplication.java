package com.demo.demo_boot_gradle;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.concurrent.Executors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

import com.demo.demo_boot_gradle.Learning.Course;
import com.demo.demo_boot_gradle.Learning.Student;
import com.demo.demo_boot_gradle.Learning.Student.PhoneType;
import com.demo.demo_boot_gradle.Learning.Student.PhoneNumber;

@SpringBootApplication
@EnableWebFlux
public class DemoBootGradleApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(DemoBootGradleApplication.class, args);
		GreetingClient greetingClient = context.getBean(GreetingClient.class);
		// block for the content here or the JVM might exit before the message is logged
		System.out.println(">> message = " + greetingClient.getMessage().block());
	}

	@Bean
	public Scheduler ioScheduler() {
			return Schedulers.fromExecutor(Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors()));
	}

	@Bean
	RestTemplate restTemplate(ProtobufHttpMessageConverter hmc) {
		return new RestTemplate(Arrays.asList(hmc));
	}

	@Bean
	ProtobufHttpMessageConverter protobufHttpMessageConverter() {
		return new ProtobufHttpMessageConverter();
	}

	@Bean
	public CourseRepository createTestCourses() {
		Map<Integer, Course> courses = new HashMap<>();

		Course course1 = Course.newBuilder().setId(1).setCourseName("1 ~ REST with Spring").addAllStudent(createTestStudents())
				.build();

		Course course2 = Course.newBuilder().setId(2).setCourseName("2 ~ Learn Spring Security")
				.addAllStudent(new ArrayList<>()).build();

		courses.put(course1.getId(), course1);
		courses.put(course2.getId(), course2);

		return new CourseRepository(courses, courses.size());
	}

	private List<Student> createTestStudents() {
		PhoneNumber phone1 = createPhone("123456", PhoneType.MOBILE);
		Student student1 = createStudent(1, "John", "Doe", "john.doe@mt.com", Arrays.asList(phone1));

		PhoneNumber phone2 = createPhone("234567", PhoneType.LANDLINE);
		Student student2 = createStudent(2, "Richard", "Roe", "richard.roe@mt.com", Arrays.asList(phone2));

		PhoneNumber phone3_1 = createPhone("345678", PhoneType.MOBILE);
		PhoneNumber phone3_2 = createPhone("456789", PhoneType.LANDLINE);
		Student student3 = createStudent(3, "Jane", "Doe", "jane.doe@mt.com", Arrays.asList(phone3_1, phone3_2));

		return Arrays.asList(student1, student2, student3);
	}

	private Student createStudent(int id, String firstName, String lastName, String email, List<PhoneNumber> phones) {
		return Student.newBuilder().setId(id).setFirstName(firstName).setLastName(lastName).setEmail(email)
				.addAllPhone(phones).build();
	}

	private PhoneNumber createPhone(String number, PhoneType type) {
		return PhoneNumber.newBuilder().setNumber(number).setType(type).build();
	}
}
