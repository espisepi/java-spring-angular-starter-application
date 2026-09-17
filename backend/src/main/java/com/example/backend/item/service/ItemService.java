package com.example.backend.item.service;

import com.example.backend.item.repository.ItemRepository;
import com.example.backend.item.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Page<Item> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
