package com.bl.server.service;

import com.bl.server.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RedisService {
    @Autowired
    private org.springframework.data.redis.core.RedisTemplate<String, Product> redisTemplate;

    private final String PREFIX = "product:";

    public Optional<Product> getProductFromCache(Integer id) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(PREFIX + id));
    }

    public void saveProductToCache(Product product) {
        redisTemplate.opsForValue().set(PREFIX + product.getId(), product);
    }
}
