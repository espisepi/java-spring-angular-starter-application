package com.example.backend.features.example.item.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.features.example.item.dto.ItemDto;
import com.example.backend.features.example.item.dto.ItemRequestDto;
import com.example.backend.features.example.item.dto.ItemUpdateRequestDto;

public interface ItemFacade {
    Page<ItemDto> findAll(Pageable pageable);

    ItemDto findById(Long id);

    ItemDto create(ItemRequestDto request);

    ItemDto update(Long id, ItemUpdateRequestDto request);

    void delete(Long id);
}
