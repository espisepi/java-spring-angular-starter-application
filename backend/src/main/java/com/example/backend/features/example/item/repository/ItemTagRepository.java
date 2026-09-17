package com.example.backend.features.example.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.features.example.item.model.ItemTag;

public interface ItemTagRepository extends JpaRepository<ItemTag, Long> {
}