package com.example.backend.features.example.item.web;

import com.example.backend.features.example.item.dto.ItemCategoryDto;
import com.example.backend.features.example.item.dto.ItemOptionRequestDto;
import com.example.backend.features.example.item.mapper.ItemCategoryMapper;
import com.example.backend.features.example.item.model.ItemCategory;
import com.example.backend.features.example.item.repository.ItemCategoryRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/item-categories")
public class ItemCategoryController {
    private final ItemCategoryRepository repository;

    public ItemCategoryController(ItemCategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<ItemCategoryDto>> findAll() {
        return ResponseEntity.ok(repository.findAll().stream()
                .map(ItemCategoryMapper::toItemCategoryDTO)
                .toList());
    }

    @PostMapping
    public ResponseEntity<ItemCategoryDto> create(@RequestBody @Valid ItemOptionRequestDto request) {
        ItemCategory category = repository.save(new ItemCategory(request.name()));
        return ResponseEntity.ok(ItemCategoryMapper.toItemCategoryDTO(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCategoryDto> update(
            @PathVariable Long id,
            @RequestBody @Valid ItemOptionRequestDto request) {
        return repository.findById(id)
                .map(category -> {
                    category.setName(request.name());
                    return ResponseEntity.ok(ItemCategoryMapper.toItemCategoryDTO(repository.save(category)));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}