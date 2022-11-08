package com.demo.demo_boot_gradle.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.repository.Collection;

@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
@Collection(value = "boot")
public class CourseModel {
    @Id
    private int id;

    private String courseName;
    private List<StudentModel> studentList;
}
