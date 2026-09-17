package com.example.backend.features.item.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.features.item.model.Item;

public interface ItemService {
    Page<Item> findAll(Pageable pageable);
}
