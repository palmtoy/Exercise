package com.demo.demo_boot_gradle;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.demo.demo_boot_gradle.Learning.Course;
import com.demo.demo_boot_gradle.model.CourseModel;
import com.demo.demo_boot_gradle.service.CourseService;

import lombok.AllArgsConstructor;

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
      courseService.getCourseById(Integer.toString(id)).subscribe();
      return c;
    } else {
      return courses.get(1);
    }
  }
}
