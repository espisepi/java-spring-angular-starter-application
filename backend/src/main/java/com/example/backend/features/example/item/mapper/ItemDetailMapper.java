package com.example.backend.features.example.item.mapper;

import com.example.backend.features.example.item.dto.ItemDetailDto;
import com.example.backend.features.example.item.model.ItemDetail;

public class ItemDetailMapper {

    public static ItemDetailDto toItemDetailDTO(ItemDetail itemDetail) {
        if (itemDetail == null) {
            return null;
        }

        return new ItemDetailDto(
                itemDetail.getId(),
                itemDetail.getDescription());
    }
}