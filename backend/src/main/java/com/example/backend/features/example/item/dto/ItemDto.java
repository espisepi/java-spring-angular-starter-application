package com.example.backend.features.example.item.dto;

import jakarta.validation.constraints.NotBlank;

public record ItemDto(
        Long id,
        @NotBlank(message = "Image is mandatory") String name) {
}
