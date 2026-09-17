package com.example.backend.features.example.item.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record ItemUpdateRequestDto(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull Long categoryId,
        Set<Long> tagIds,
        Set<Long> relatedItemIds) {
}