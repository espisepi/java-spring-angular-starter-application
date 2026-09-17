package com.example.backend.features.example.item.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.item.repository.ItemRepository;
import com.example.backend.features.example.item.service.ItemService;

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

    @Override
    @Transactional(readOnly = true)
    public Optional<Item> findById(Long id) {
        return repository.findById(id);
    }
}
