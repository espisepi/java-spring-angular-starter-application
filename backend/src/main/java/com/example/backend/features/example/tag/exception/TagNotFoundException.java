package com.example.backend.features.example.tag.exception;

import jakarta.persistence.EntityNotFoundException;

public class TagNotFoundException extends EntityNotFoundException {
    public TagNotFoundException(String message) {
        super(message);
    }

    public static TagNotFoundException forId(Long tagId) {
        return new TagNotFoundException("Tag with id " + tagId + " not found");
    }
}
