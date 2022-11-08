package com.demo.demo_boot_gradle;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.demo.demo_boot_gradle.model.PhoneNumModel;
import com.demo.demo_boot_gradle.model.StudentModel;
import org.springframework.beans.factory.annotation.Autowired;

import com.demo.demo_boot_gradle.Learning.*;
import com.demo.demo_boot_gradle.model.CourseModel;
import com.demo.demo_boot_gradle.service.CourseService;

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

    List<Learning.Student> studentList = c.getStudentList();
    List<StudentModel> studentModelList = new LinkedList<>();
    studentList.forEach(s -> {
      List<PhoneNumModel> phoneNumModelList = new LinkedList<>();
      List<Learning.Student.PhoneNumber> phoneList = s.getPhoneList();
      phoneList.forEach(p -> {
        PhoneNumModel phoneNumModel = new PhoneNumModel(p.getTypeValue(), p.getNumber());
        phoneNumModelList.add(phoneNumModel);
      });
      StudentModel studentModel = new StudentModel(s.getId(), s.getFirstName(), s.getLastName(), s.getEmail(), phoneNumModelList);
      studentModelList.add(studentModel);
    });

    CourseModel courseObj = new CourseModel(curId, c.getCourseName(), studentModelList);
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

  public Mono<String> deleteCourseById(String id) {
    return courseService.deleteCourseById(id);
  }
}
