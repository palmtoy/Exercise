package com.demo.demo_boot_gradle;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.demo.demo_boot_gradle.Learning.Course;
import com.demo.demo_boot_gradle.model.CourseModel;
import com.demo.demo_boot_gradle.service.CourseService;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

public class CourseRepository {
  private final Map<Integer, Course> courses;
  private Integer curId;
  @Autowired
  private CourseService courseService;

  CourseRepository(Map<Integer, Course> c, Integer id) {
    courses = c;
    curId = id;
  }

  public Integer putNewCourse(Course c) {
    curId++;
    Course course = Course.newBuilder().setId(curId).setCourseName(curId.toString() + " ~ " + c.getCourseName()).build();
    this.courses.put(curId, course);

    CourseModel courseObj = new CourseModel(curId, c.getCourseName());
    courseService.saveCourse(courseObj).subscribe();
    return curId;
  }

  public Course getCourseById(int id) {
    Course c = courses.get(id);
    if (c != null) {
      return c;
    } else {
      return courses.get(1);
    }
  }

  public Mono<Course> getCourseByIdFromDB(int id) {
    return courseService.getCourseById(Integer.toString(id))
        .map(courseModel -> Course.newBuilder().setId(courseModel.getId()).setCourseName(courseModel.getCourseName()).build())
        .switchIfEmpty(Mono.defer(() -> {
          System.out.println("\nDid NOT get course model which id = " + id + "\n");
          Course c = Course.newBuilder().setId(courses.get(1).getId()).setCourseName(courses.get(1).getCourseName()).build();
          return Mono.just(c);
        }));
  }

  public Mono<Void> deleteCourseById(int id) {
    return courseService.deleteCourseById(Integer.toString(id));
  }
}
