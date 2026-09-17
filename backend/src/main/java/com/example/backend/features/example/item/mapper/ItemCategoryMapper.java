package com.example.backend.features.example.item.mapper;

import com.example.backend.features.example.item.dto.ItemCategoryDto;
import com.example.backend.features.example.item.model.ItemCategory;

public class ItemCategoryMapper {

    public static ItemCategoryDto toItemCategoryDTO(ItemCategory category) {
        if (category == null) {
            return null;
        }

        return new ItemCategoryDto(
                category.getId(),
                category.getName());
    }
}
