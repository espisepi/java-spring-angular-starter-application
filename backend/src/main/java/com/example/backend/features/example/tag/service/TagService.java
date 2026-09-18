package com.example.backend.features.example.tag.service;

import java.util.List;

import com.example.backend.features.example.tag.dto.TagRequestDto;
import com.example.backend.features.example.tag.dto.TagUpdateRequestDto;
import com.example.backend.features.example.tag.model.ItemTag;

public interface TagService {
    List<ItemTag> findAll();

    ItemTag findById(Long id);

    ItemTag create(TagRequestDto request);

    ItemTag update(Long id, TagUpdateRequestDto request);

    void delete(Long id);
}
