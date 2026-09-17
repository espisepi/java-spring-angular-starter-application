package com.example.backend.item.mapper;

import com.example.backend.item.dto.ItemDto;
import com.example.backend.item.model.Item;

public class ItemMapper {

    public static ItemDto toItemDto(Item item) {
        return new ItemDto(item.getId(), item.getName());
    }

}
