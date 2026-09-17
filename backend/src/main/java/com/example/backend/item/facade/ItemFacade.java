package com.example.backend.item.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.item.dto.ItemDto;
import com.example.backend.item.mapper.ItemMapper;
import com.example.backend.item.model.Item;
import com.example.backend.item.service.ItemService;

@Service
public class ItemFacade {
    private final ItemService itemService;

    public ItemFacade(ItemService itemService) {
        this.itemService = itemService;
    }

    public Page<ItemDto> getAllItems(Pageable pageable) {
        Page<Item> items = itemService.findAll(pageable);
        return items.map(ItemMapper::toItemDto);
    }
}
