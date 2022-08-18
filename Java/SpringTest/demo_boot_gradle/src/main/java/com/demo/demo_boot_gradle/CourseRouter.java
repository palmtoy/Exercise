package com.demo.demo_boot_gradle;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RequestPredicates.contentType;

@Configuration(proxyBeanMethods = false)
public class CourseRouter {

	@Bean
	public RouterFunction<ServerResponse> courseRoute(CourseHandler courseHandler) {
		return RouterFunctions
				.route(GET("/courses/{id}").and(accept(MediaType.APPLICATION_JSON)), courseHandler::getCourseById)
				.andRoute(
						POST("/courses/save").and(accept(MediaType.APPLICATION_OCTET_STREAM))
								.and(contentType(MediaType.APPLICATION_OCTET_STREAM)),
						courseHandler::putNewCourse);
	}

}
