package com.example.backend.item.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.item.dto.ItemDto;

public interface ItemFacade {
    public Page<ItemDto> findAll(Pageable pageable);
}
