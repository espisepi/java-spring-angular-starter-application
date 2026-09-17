package com.example.backend.features.example.item.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.item.dto.ItemRequestDto;
import com.example.backend.features.example.item.dto.ItemUpdateRequestDto;

public interface ItemService {
    Page<Item> findAll(Pageable pageable);

    Optional<Item> findById(Long id);

    Item create(ItemRequestDto request);

    Item update(Long id, ItemUpdateRequestDto request);

    void delete(Long id);
}
