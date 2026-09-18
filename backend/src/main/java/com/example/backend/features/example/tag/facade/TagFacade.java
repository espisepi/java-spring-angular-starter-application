package com.example.backend.features.example.tag.facade;

import java.util.List;

import com.example.backend.features.example.tag.dto.ItemTagDto;
import com.example.backend.features.example.tag.dto.TagRequestDto;
import com.example.backend.features.example.tag.dto.TagUpdateRequestDto;

public interface TagFacade {
    List<ItemTagDto> findAll();

    ItemTagDto findById(Long id);

    ItemTagDto create(TagRequestDto request);

    ItemTagDto update(Long id, TagUpdateRequestDto request);

    void delete(Long id);
}
