package com.example.backend.features.example.tag.dto;

import jakarta.validation.constraints.NotBlank;

public record TagUpdateRequestDto(@NotBlank String name) {
}
