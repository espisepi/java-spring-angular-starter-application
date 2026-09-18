package com.example.backend.features.example.tag.facade.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.tag.dto.ItemTagDto;
import com.example.backend.features.example.tag.dto.TagRequestDto;
import com.example.backend.features.example.tag.dto.TagUpdateRequestDto;
import com.example.backend.features.example.tag.facade.TagFacade;
import com.example.backend.features.example.tag.mapper.ItemTagMapper;
import com.example.backend.features.example.tag.service.TagService;

@Service
@Transactional
public class TagFacadeImpl implements TagFacade {
    private final TagService tagService;

    public TagFacadeImpl(TagService tagService) {
        this.tagService = tagService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemTagDto> findAll() {
        return tagService.findAll().stream()
                .map(ItemTagMapper::toItemTagDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ItemTagDto findById(Long id) {
        return ItemTagMapper.toItemTagDTO(tagService.findById(id));
    }

    @Override
    public ItemTagDto create(TagRequestDto request) {
        return ItemTagMapper.toItemTagDTO(tagService.create(request));
    }

    @Override
    public ItemTagDto update(Long id, TagUpdateRequestDto request) {
        return ItemTagMapper.toItemTagDTO(tagService.update(id, request));
    }

    @Override
    public void delete(Long id) {
        tagService.delete(id);
    }
}
