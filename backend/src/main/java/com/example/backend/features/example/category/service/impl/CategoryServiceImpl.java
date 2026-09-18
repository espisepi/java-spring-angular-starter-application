package com.example.backend.features.example.category.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.category.dto.CategoryRequestDto;
import com.example.backend.features.example.category.dto.CategoryUpdateRequestDto;
import com.example.backend.features.example.category.exception.CategoryNotFoundException;
import com.example.backend.features.example.category.model.ItemCategory;
import com.example.backend.features.example.category.repository.ItemCategoryRepository;
import com.example.backend.features.example.category.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
    private final ItemCategoryRepository repository;

    public CategoryServiceImpl(ItemCategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemCategory> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public ItemCategory findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> CategoryNotFoundException.forId(id));
    }

    @Override
    public ItemCategory create(CategoryRequestDto request) {
        return repository.save(new ItemCategory(request.name()));
    }

    @Override
    public ItemCategory update(Long id, CategoryUpdateRequestDto request) {
        ItemCategory category = findById(id);
        category.setName(request.name());
        return repository.save(category);
    }

    @Override
    public void delete(Long id) {
        ItemCategory category = findById(id);
        repository.delete(category);
    }
}
