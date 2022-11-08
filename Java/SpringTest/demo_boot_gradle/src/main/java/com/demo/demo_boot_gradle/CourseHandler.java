package com.demo.demo_boot_gradle;

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
    final CourseRepository courseRepo;

    public CourseHandler(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    public Mono<ServerResponse> getCourseById(ServerRequest request) {
        int id = Integer.parseInt(request.pathVariable("id"));
        System.out.println("Receive a new request /courses/" + id);
        return courseRepo.getCourseByIdFromDB(id)
            .flatMap(course ->
                ServerResponse.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(BodyInserters.fromValue(course)));
    }

  public Mono<ServerResponse> putNewCourse(ServerRequest request) {
    return request.bodyToMono(Course.class)
        .flatMap(msg -> {
          System.out.println("Receive a new request /courses/save, msg =>\n" + msg);
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
          return Mono.empty();
        })
        .flatMap(cObj -> {
          if (cObj != null) {
            return Mono.just(courseRepo.putNewCourse(cObj));
          } else {
            return Mono.just(-1);
          }
        })
        .flatMap(id -> courseRepo.getCourseByIdFromDB(id)
            .flatMap(course ->
               ServerResponse.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
               .body(BodyInserters.fromValue(course))));
  }

  public Mono<ServerResponse> deleteCourseById(ServerRequest request) {
      var id = request.pathVariable("id");
      System.out.println("Receive a new request delete /courses/" + id);
      return courseRepo.deleteCourseById(id)
              .flatMap(cId -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                      .body(BodyInserters.fromValue(new Greeting("Course(id = " + cId + ") deleted."))));
  }

  public Mono<ServerResponse> updateCourseById(ServerRequest request) {
     var cId = request.pathVariable("id");
     System.out.println("Receive a new request update /courses/" + cId);
     return request.bodyToMono(MyProtoMsg.class)
        .flatMap(msg -> {
          System.out.println("_updateCourseById: msg =>\n" + msg);
          try {
            return Mono.just(msg.getData().unpack(Course.class));
          } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
          }
          return Mono.empty();
        })
        .flatMap(cObj -> {
          if (cObj != null) {
            return Mono.just(courseRepo.putNewCourse(cObj));
          } else {
            return Mono.just(-1);
          }
        })
        .flatMap(id -> courseRepo.getCourseByIdFromDB(id)
            .flatMap(course ->
               ServerResponse.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
               .body(BodyInserters.fromValue(course))));

  }

}
