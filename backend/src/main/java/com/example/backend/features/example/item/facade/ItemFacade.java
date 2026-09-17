package com.example.backend.features.example.item.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.features.example.item.dto.ItemDto;

public interface ItemFacade {
    Page<ItemDto> findAll(Pageable pageable);
}
