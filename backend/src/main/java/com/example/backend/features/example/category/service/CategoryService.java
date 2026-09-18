package com.example.backend.features.example.category.service;

import java.util.List;

import com.example.backend.features.example.category.dto.CategoryRequestDto;
import com.example.backend.features.example.category.dto.CategoryUpdateRequestDto;
import com.example.backend.features.example.category.model.ItemCategory;

public interface CategoryService {
    List<ItemCategory> findAll();

    ItemCategory findById(Long id);

    ItemCategory create(CategoryRequestDto request);

    ItemCategory update(Long id, CategoryUpdateRequestDto request);

    void delete(Long id);
}
