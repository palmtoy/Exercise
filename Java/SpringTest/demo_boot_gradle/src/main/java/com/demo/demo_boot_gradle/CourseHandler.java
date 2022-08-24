package com.demo.demo_boot_gradle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.demo.demo_boot_gradle.Learning.Course;
import com.demo.demo_boot_gradle.Learning.MyProtoMsg;
import com.google.protobuf.InvalidProtocolBufferException;

import reactor.core.publisher.Mono;

@Component
public class CourseHandler {
  @Autowired
  CourseRepository courseRepo;

  public Mono<ServerResponse> getCourseById(ServerRequest request) {
    Integer id = Integer.parseInt(request.pathVariable("id"));
    System.out.println("Receive a new request /courses/" + id);
    return ServerResponse.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(BodyInserters.fromValue(courseRepo.getCourseById(id)));
  }

  public Mono<ServerResponse> putNewCourse(ServerRequest request) {
    return request.bodyToMono(Course.class)
        .flatMap(msg -> {
          System.out.println("Receive a new request /courses/save, msg => " + msg);
          return Mono.just(courseRepo.putNewCourse(msg));
        })
        .flatMap(id -> ServerResponse.ok().bodyValue(courseRepo.getCourseById(id)));
  }

  public Mono<ServerResponse> putNewCourse2(ServerRequest request) {
    return request.bodyToMono(MyProtoMsg.class)
        .flatMap(msg -> {
          System.out.println("Receive a new request /courses/save2, msg =>\n" + msg);
          try {
            return Mono.just(msg.getData().unpack(Course.class));
          } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
          }
          return null;
        })
        .flatMap(cObj -> {
          if (cObj != null) {
            return Mono.just(courseRepo.putNewCourse(cObj));
          } else {
            return Mono.just(-1);
          }
        })
        .flatMap(id -> ServerResponse.ok().bodyValue(courseRepo.getCourseById(id)));
  }

}
