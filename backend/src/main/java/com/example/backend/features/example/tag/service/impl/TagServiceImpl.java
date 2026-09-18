package com.example.backend.features.example.tag.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.tag.dto.TagRequestDto;
import com.example.backend.features.example.tag.dto.TagUpdateRequestDto;
import com.example.backend.features.example.tag.exception.TagNotFoundException;
import com.example.backend.features.example.tag.model.ItemTag;
import com.example.backend.features.example.tag.repository.ItemTagRepository;
import com.example.backend.features.example.tag.service.TagService;

@Service
@Transactional
public class TagServiceImpl implements TagService {
    private final ItemTagRepository repository;

    public TagServiceImpl(ItemTagRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemTag> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public ItemTag findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> TagNotFoundException.forId(id));
    }

    @Override
    public ItemTag create(TagRequestDto request) {
        return repository.save(new ItemTag(request.name()));
    }

    @Override
    public ItemTag update(Long id, TagUpdateRequestDto request) {
        ItemTag tag = findById(id);
        tag.setName(request.name());
        return repository.save(tag);
    }

    @Override
    public void delete(Long id) {
        ItemTag tag = findById(id);
        repository.delete(tag);
    }
}
