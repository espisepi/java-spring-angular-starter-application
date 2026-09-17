package com.example.backend.features.example.item.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.item.model.ItemCategory;
import com.example.backend.features.example.item.model.ItemDetail;
import com.example.backend.features.example.item.model.ItemTag;
import com.example.backend.features.example.item.dto.ItemRequestDto;
import com.example.backend.features.example.item.dto.ItemUpdateRequestDto;
import com.example.backend.features.example.item.exception.ItemNotFoundException;
import com.example.backend.features.example.item.repository.ItemCategoryRepository;
import com.example.backend.features.example.item.repository.ItemRepository;
import com.example.backend.features.example.item.repository.ItemTagRepository;
import com.example.backend.features.example.item.service.ItemService;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {
    private final ItemRepository repository;
    private final ItemCategoryRepository categoryRepository;
    private final ItemTagRepository tagRepository;

    public ItemServiceImpl(ItemRepository repository,
            ItemCategoryRepository categoryRepository,
            ItemTagRepository tagRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    public Page<Item> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Item> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Item create(ItemRequestDto request) {
        Item item = new Item();
        applyRequest(item, request.name(), request.description(), request.categoryId(),
                request.tagIds(), request.relatedItemIds());
        return repository.save(item);
    }

    @Override
    public Item update(Long id, ItemUpdateRequestDto request) {
        Item item = repository.findById(id).orElseThrow(() -> ItemNotFoundException.forId(id));
        applyRequest(item, request.name(), request.description(), request.categoryId(),
                request.tagIds(), request.relatedItemIds());
        return repository.save(item);
    }

    @Override
    public void delete(Long id) {
        Item item = repository.findById(id).orElseThrow(() -> ItemNotFoundException.forId(id));
        repository.delete(item);
    }

    private void applyRequest(Item item,
            String name,
            String description,
            Long categoryId,
            Set<Long> tagIds,
            Set<Long> relatedItemIds) {
        ItemCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category with id " + categoryId + " not found"));

        Set<Long> requestedTagIds = tagIds == null ? Set.of() : tagIds;
        Set<Long> requestedRelatedItemIds = relatedItemIds == null ? Set.of() : relatedItemIds;

        Set<ItemTag> tags = new HashSet<>(tagRepository.findAllById(requestedTagIds));
        if (tags.size() != requestedTagIds.size()) {
            throw new IllegalArgumentException("One or more tag IDs do not exist");
        }

        Set<Item> relatedItems = new HashSet<>(repository.findAllById(requestedRelatedItemIds));
        if (relatedItems.size() != requestedRelatedItemIds.size()
                || relatedItems.stream().anyMatch(relatedItem -> Objects.equals(relatedItem.getId(), item.getId()))) {
            throw new IllegalArgumentException("One or more related item IDs are invalid");
        }

        item.setName(name);
        item.setDetail(new ItemDetail(description));
        item.setCategory(category);
        item.setTags(tags);
        item.setRelatedItems(relatedItems);
    }
}
