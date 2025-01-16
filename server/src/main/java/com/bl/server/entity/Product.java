package com.bl.server.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "t_product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "imageLink", length = 500)
    private String imageLink;

    @Column(name = "tags", length = 1000)
    private String tags; // Store tags as a comma-separated string

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    // Default constructor
    public Product() {
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public List<String> getTags() {
        if (tags == null || tags.isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.asList(tags.split(",\\s*"));
    }

    public void setTags(List<String> tags) {
        if (tags == null || tags.isEmpty()) {
            this.tags = null;
        } else {
            this.tags = String.join(", ", tags);
        }
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
