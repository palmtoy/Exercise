package com.demo.demo_boot_gradle.service;

import lombok.AllArgsConstructor;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.data.couchbase.core.ReactiveCouchbaseTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import com.demo.demo_boot_gradle.dao.CourseDao;
import com.demo.demo_boot_gradle.model.CourseModel;
import com.couchbase.client.java.ReactiveCollection;


@AllArgsConstructor
@Service
public class CourseService {
    private CourseDao courseDao;
    private ReactiveCouchbaseTemplate reactiveCouchbaseTemplate;

    public void flush() {
        template().getCouchbaseClientFactory().getCluster().buckets().flushBucket(template().getBucketName());
    }

    public ReactiveCollection collection() {
        return template().getCouchbaseClientFactory().getBucket().reactive().collection(collectionName());
    }

    protected ReactiveCouchbaseTemplate template() {
        return reactiveCouchbaseTemplate;
    }

    protected String collectionName() {
        return "boot";
    }

    public Mono<CourseModel> getCourseById(String id) {
        return courseDao.findById(id);
    }

    public Mono<CourseModel> saveCourse(CourseModel course) {
        return courseDao.save(course);
    }

    public Mono<Void> deleteCourseById(String id) {
        return courseDao.deleteById(id)
                .onErrorResume(DataRetrievalFailureException.class, error -> {
                    System.out.println("CourseService deleteCourseById trigger DataRetrievalFailureException, id: " + id + ", message: " + error.getMessage());
                    return Mono.empty();
                });
    }
}
