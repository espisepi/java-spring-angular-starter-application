package com.example.backend.features.example.item.mapper;

import com.example.backend.features.example.item.dto.ItemDto;
import com.example.backend.features.example.item.model.Item;

public class ItemMapper {

    public static ItemDto toItemDto(Item item) {
        return new ItemDto(item.getId(), item.getName());
    }

}
