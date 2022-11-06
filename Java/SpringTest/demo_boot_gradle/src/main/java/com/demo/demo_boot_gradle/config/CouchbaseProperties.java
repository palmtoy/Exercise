package com.demo.demo_boot_gradle.config;

import java.time.Duration;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("couchbase")
public class CouchbaseProperties {
    private String host;
    private String username;
    private String password;
    private String bucket;
    private Integer kvConnectionNum = 4;
    private Integer minCompressionSize = 2048;
    private Duration connectionTimeOut = Duration.ofSeconds(3);
    private Duration kvTimeOut = Duration.ofSeconds(10);
}
