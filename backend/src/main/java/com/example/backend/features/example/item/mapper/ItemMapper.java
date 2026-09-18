package com.example.backend.features.example.item.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.backend.features.example.category.mapper.ItemCategoryMapper;
import com.example.backend.features.example.item.dto.ItemDto;
import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.tag.mapper.ItemTagMapper;

public class ItemMapper {

    public static ItemDto toItemDTO(Item item) {
        return new ItemDto(
                item.getId(),
                item.getName(),
                ItemDetailMapper.toItemDetailDTO(item.getDetail()),
                ItemCategoryMapper.toItemCategoryDTO(item.getCategory()),
                ItemImageMapper.toItemImageDTOList(item.getImages()),
                ItemTagMapper.toItemTagDTOList(item.getTags()),
                toItemDTOList(item.getRelatedItems()));
    }

    public static Set<ItemDto> toItemDTOList(Set<Item> items) {
        if (items == null) {
            return Collections.emptySet();
        }

        return items.stream()
                .map(ItemMapper::toItemDTO)
                .collect(Collectors.toSet());
    }

}
