package com.example.backend.features.example.item.exception;

import jakarta.persistence.EntityNotFoundException;

public class ItemNotFoundException extends EntityNotFoundException {
    public ItemNotFoundException(String message) {
        super(message);
    }

    public static ItemNotFoundException forId(Long itemId) {
        return new ItemNotFoundException("Item with id " + itemId + " not found");
    }
}