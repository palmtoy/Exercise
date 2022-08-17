package com.demo.demo_boot_gradle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Mono;

@Component
public class CourseHandler {
  @Autowired
  CourseRepository courseRepo;

  public Mono<ServerResponse> getCourseById(ServerRequest request) {
    return ServerResponse.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(BodyInserters.fromValue(courseRepo.getCourseById(1)));
  }

}