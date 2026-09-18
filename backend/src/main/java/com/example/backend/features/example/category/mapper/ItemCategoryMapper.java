package com.example.backend.features.example.category.mapper;

import com.example.backend.features.example.category.dto.ItemCategoryDto;
import com.example.backend.features.example.category.model.ItemCategory;

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
