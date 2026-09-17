package com.example.backend.features.example.item.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.backend.features.example.item.dto.ItemImageDto;
import com.example.backend.features.example.item.model.ItemImage;

public class ItemImageMapper {

    public static ItemImageDto toItemImageDTO(ItemImage image) {
        return new ItemImageDto(
                image.getId(),
                image.getUrl());
    }

    public static Set<ItemImageDto> toItemImageDTOList(Set<ItemImage> images) {
        if (images == null) {
            return Collections.emptySet();
        }

        return images.stream()
                .map(ItemImageMapper::toItemImageDTO)
                .collect(Collectors.toSet());
    }
}