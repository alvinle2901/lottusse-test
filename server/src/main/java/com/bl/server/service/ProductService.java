package com.bl.server.service;

import com.bl.server.entity.Product;
import com.bl.server.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RedisService redisService;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer id) {
        // Check Redis cache
        Optional<Product> cachedProduct = redisService.getProductFromCache(id);
        if (cachedProduct.isPresent()) {
            return cachedProduct;
        }

        // Retrieve from database if not in Redis
        Optional<Product> product = productRepository.findById(id);
        product.ifPresent(redisService::saveProductToCache);

        return product;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}

