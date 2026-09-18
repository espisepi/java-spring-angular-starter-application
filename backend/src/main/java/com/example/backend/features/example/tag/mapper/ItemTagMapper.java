package com.example.backend.features.example.tag.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.backend.features.example.tag.dto.ItemTagDto;
import com.example.backend.features.example.tag.model.ItemTag;

public class ItemTagMapper {

    public static ItemTagDto toItemTagDTO(ItemTag tag) {
        return new ItemTagDto(
                tag.getId(),
                tag.getName());
    }

    public static Set<ItemTagDto> toItemTagDTOList(Set<ItemTag> tags) {
        if (tags == null) {
            return Collections.emptySet();
        }

        return tags.stream()
                .map(ItemTagMapper::toItemTagDTO)
                .collect(Collectors.toSet());
    }
}