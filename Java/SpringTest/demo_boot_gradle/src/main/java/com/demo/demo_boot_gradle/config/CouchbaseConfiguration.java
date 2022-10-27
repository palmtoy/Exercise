package com.demo.demo_boot_gradle.config;

import java.time.Duration;
import java.util.Collections;
import javax.annotation.Resource;

import com.couchbase.client.core.env.CompressionConfig;
import com.couchbase.client.core.env.IoConfig;
import com.couchbase.client.core.env.IoEnvironment;
import com.couchbase.client.core.env.OrphanReporterConfig;
import com.couchbase.client.core.env.TimeoutConfig;
import com.couchbase.client.core.retry.BestEffortRetryStrategy;
import com.couchbase.client.java.env.ClusterEnvironment;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.couchbase.config.AbstractCouchbaseConfiguration;
import org.springframework.data.couchbase.config.BeanNames;
import org.springframework.data.couchbase.core.convert.CouchbaseCustomConversions;
import org.springframework.data.couchbase.repository.config.EnableReactiveCouchbaseRepositories;

@Configuration
@EnableConfigurationProperties(CouchbaseProperties.class)
@EnableReactiveCouchbaseRepositories
public class CouchbaseConfiguration extends AbstractCouchbaseConfiguration {

    @Resource()
    private CouchbaseProperties properties;

    @Override
    public String getConnectionString() {
        return "couchbase://" + properties.getHost();
    }

    @Override
    public String getUserName() {
        return properties.getUsername();
    }

    @Override
    public String getPassword() {
        return properties.getPassword();
    }

    @Override
    public String getBucketName() {
        return properties.getBucket();
    }

    @Bean(name = BeanNames.COUCHBASE_CUSTOM_CONVERSIONS)
    @Primary
    @Override
    public CouchbaseCustomConversions customConversions() {
        return new CouchbaseCustomConversions(Collections.emptyList());
    }

    @Override
    protected void configureEnvironment(ClusterEnvironment.Builder builder) {
        builder.ioConfig(IoConfig.builder().numKvConnections(properties.getKvConnectionNum()))
                .ioEnvironment(IoEnvironment.builder().eventLoopThreadCount(Runtime.getRuntime().availableProcessors()))
                .timeoutConfig(TimeoutConfig.connectTimeout(properties.getConnectionTimeOut()).kvTimeout(properties.getKvTimeOut()))
                .retryStrategy(BestEffortRetryStrategy.withExponentialBackoff(Duration.ofMillis(8), Duration.ofMillis(100), 2))
                .compressionConfig(CompressionConfig.builder().minSize(properties.getMinCompressionSize()))
                .orphanReporterConfig(OrphanReporterConfig.builder().emitInterval(Duration.ofHours(1)))
                .thresholdLoggingTracerConfig()
                .sampleSize(20);
    }
}
