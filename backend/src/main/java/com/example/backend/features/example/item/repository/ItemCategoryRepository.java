package com.example.backend.features.example.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.features.example.item.model.ItemCategory;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
}