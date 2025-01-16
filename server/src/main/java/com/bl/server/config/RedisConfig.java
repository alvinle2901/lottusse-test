package com.bl.server.config;

import com.bl.server.entity.Product;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class RedisConfig {
    @Bean
    public org.springframework.data.redis.connection.RedisConnectionFactory redisConnectionFactory() {
        return new org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory();
    }

    @Bean
    public org.springframework.data.redis.core.RedisTemplate<String, Product> redisTemplate() {
        org.springframework.data.redis.core.RedisTemplate<String, Product> template = new org.springframework.data.redis.core.RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        return template;
    }
}
