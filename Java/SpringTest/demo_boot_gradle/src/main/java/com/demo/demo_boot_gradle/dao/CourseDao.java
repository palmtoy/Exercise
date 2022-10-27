package com.demo.demo_boot_gradle.dao;

import com.demo.demo_boot_gradle.model.CourseModel;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface CourseDao extends ReactiveCrudRepository<CourseModel, String> {}
