package com.example.backend.item.service;

import com.example.backend.item.repository.ItemRepository;
import com.example.backend.item.model.Item;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }
}
