package com.demo.demo_boot_gradle;

import java.util.Map;
import com.demo.demo_boot_gradle.Learning.Course;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CourseRepository {
  private final Map<Integer, Course> courses;

  public Course getCourseById(int id) {
    return courses.get(id);
  }
}
