package com.example.backend.features.example.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.features.example.tag.model.ItemTag;

public interface ItemTagRepository extends JpaRepository<ItemTag, Long> {
}