package com.example.backend.features.example.category.facade;

import java.util.List;

import com.example.backend.features.example.category.dto.CategoryRequestDto;
import com.example.backend.features.example.category.dto.CategoryUpdateRequestDto;
import com.example.backend.features.example.category.dto.ItemCategoryDto;

public interface CategoryFacade {
    List<ItemCategoryDto> findAll();

    ItemCategoryDto findById(Long id);

    ItemCategoryDto create(CategoryRequestDto request);

    ItemCategoryDto update(Long id, CategoryUpdateRequestDto request);

    void delete(Long id);
}
