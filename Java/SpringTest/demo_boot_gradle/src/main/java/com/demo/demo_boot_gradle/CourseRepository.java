package com.demo.demo_boot_gradle;

import java.util.Map;
import com.demo.demo_boot_gradle.Learning.Course;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CourseRepository {
  private final Map<Integer, Course> courses;
  private Integer curId;

  public Integer putNewCourse(Course c) {
    curId++;
    Course course = Course.newBuilder().setId(curId).setCourseName(curId.toString() + " ~ " + c.getCourseName()).build();
    this.courses.put(curId, course);
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
}
