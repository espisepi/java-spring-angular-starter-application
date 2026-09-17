package com.example.backend.item.service.impl;

import com.example.backend.item.repository.ItemRepository;
import com.example.backend.item.service.ItemService;
import com.example.backend.item.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {
    private final ItemRepository repository;

    public ItemServiceImpl(ItemRepository repository) {
        this.repository = repository;
    }

    public Page<Item> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
