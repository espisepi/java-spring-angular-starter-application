package com.example.backend.features.example.item.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.features.example.item.model.Item;

public interface ItemService {
    Page<Item> findAll(Pageable pageable);
}
