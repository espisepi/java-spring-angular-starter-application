package com.example.backend.features.example.category.exception;

import jakarta.persistence.EntityNotFoundException;

public class CategoryNotFoundException extends EntityNotFoundException {
    public CategoryNotFoundException(String message) {
        super(message);
    }

    public static CategoryNotFoundException forId(Long categoryId) {
        return new CategoryNotFoundException("Category with id " + categoryId + " not found");
    }
}
