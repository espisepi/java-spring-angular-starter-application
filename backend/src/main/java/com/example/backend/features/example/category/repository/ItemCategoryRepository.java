package com.example.backend.features.example.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.features.example.category.model.ItemCategory;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
}