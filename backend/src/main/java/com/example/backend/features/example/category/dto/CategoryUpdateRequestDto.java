package com.example.backend.features.example.category.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryUpdateRequestDto(@NotBlank String name) {
}
