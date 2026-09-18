package com.example.backend.features.example.item.dto;

import java.util.Set;

import com.example.backend.features.example.category.dto.ItemCategoryDto;
import com.example.backend.features.example.tag.dto.ItemTagDto;

public record ItemDto(Long id,
                String name,
                ItemDetailDto detail,
                ItemCategoryDto category,
                Set<ItemImageDto> images,
                Set<ItemTagDto> tags,
                Set<ItemDto> relatedItems) {
}
