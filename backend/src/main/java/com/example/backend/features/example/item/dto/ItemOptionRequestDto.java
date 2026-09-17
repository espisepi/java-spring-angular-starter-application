package com.example.backend.features.example.item.dto;

import jakarta.validation.constraints.NotBlank;

public record ItemOptionRequestDto(@NotBlank String name) {
}