package com.example.backend.item.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.item.model.Item;

public interface ItemService {
    Page<Item> findAll(Pageable pageable);
}
