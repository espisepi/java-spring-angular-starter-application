package com.example.backend.features.example.item.facade.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.item.dto.ItemDto;
import com.example.backend.features.example.item.dto.ItemRequestDto;
import com.example.backend.features.example.item.dto.ItemUpdateRequestDto;
import com.example.backend.features.example.item.exception.ItemNotFoundException;
import com.example.backend.features.example.item.facade.ItemFacade;
import com.example.backend.features.example.item.mapper.ItemMapper;
import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.item.service.ItemService;

@Service
@Transactional
public class ItemFacadeImpl implements ItemFacade {
    private final ItemService itemService;

    public ItemFacadeImpl(ItemService itemService) {
        this.itemService = itemService;
    }

    public Page<ItemDto> findAll(Pageable pageable) {
        Page<Item> items = itemService.findAll(pageable);
        return items.map(ItemMapper::toItemDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ItemDto findById(Long id) {
        return itemService.findById(id)
                .map(ItemMapper::toItemDTO)
                .orElseThrow(() -> ItemNotFoundException.forId(id));
    }

    @Override
    public ItemDto create(ItemRequestDto request) {
        return ItemMapper.toItemDTO(itemService.create(request));
    }

    @Override
    public ItemDto update(Long id, ItemUpdateRequestDto request) {
        return ItemMapper.toItemDTO(itemService.update(id, request));
    }

    @Override
    public void delete(Long id) {
        itemService.delete(id);
    }

}
