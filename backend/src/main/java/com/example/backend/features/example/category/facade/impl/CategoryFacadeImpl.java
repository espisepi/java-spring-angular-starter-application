package com.example.backend.features.example.category.facade.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.category.dto.CategoryRequestDto;
import com.example.backend.features.example.category.dto.CategoryUpdateRequestDto;
import com.example.backend.features.example.category.dto.ItemCategoryDto;
import com.example.backend.features.example.category.facade.CategoryFacade;
import com.example.backend.features.example.category.mapper.ItemCategoryMapper;
import com.example.backend.features.example.category.service.CategoryService;

@Service
@Transactional
public class CategoryFacadeImpl implements CategoryFacade {
    private final CategoryService categoryService;

    public CategoryFacadeImpl(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemCategoryDto> findAll() {
        return categoryService.findAll().stream()
                .map(ItemCategoryMapper::toItemCategoryDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ItemCategoryDto findById(Long id) {
        return ItemCategoryMapper.toItemCategoryDTO(categoryService.findById(id));
    }

    @Override
    public ItemCategoryDto create(CategoryRequestDto request) {
        return ItemCategoryMapper.toItemCategoryDTO(categoryService.create(request));
    }

    @Override
    public ItemCategoryDto update(Long id, CategoryUpdateRequestDto request) {
        return ItemCategoryMapper.toItemCategoryDTO(categoryService.update(id, request));
    }

    @Override
    public void delete(Long id) {
        categoryService.delete(id);
    }
}
