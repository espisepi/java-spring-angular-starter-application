package com.example.backend.features.example.item.web;

import com.example.backend.features.example.item.dto.ItemOptionRequestDto;
import com.example.backend.features.example.item.dto.ItemTagDto;
import com.example.backend.features.example.item.mapper.ItemTagMapper;
import com.example.backend.features.example.item.model.ItemTag;
import com.example.backend.features.example.item.repository.ItemTagRepository;
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
@RequestMapping("/api/item-tags")
public class ItemTagController {
    private final ItemTagRepository repository;

    public ItemTagController(ItemTagRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<ItemTagDto>> findAll() {
        return ResponseEntity.ok(repository.findAll().stream()
                .map(ItemTagMapper::toItemTagDTO)
                .toList());
    }

    @PostMapping
    public ResponseEntity<ItemTagDto> create(@RequestBody @Valid ItemOptionRequestDto request) {
        ItemTag tag = repository.save(new ItemTag(request.name()));
        return ResponseEntity.ok(ItemTagMapper.toItemTagDTO(tag));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemTagDto> update(
            @PathVariable Long id,
            @RequestBody @Valid ItemOptionRequestDto request) {
        return repository.findById(id)
                .map(tag -> {
                    tag.setName(request.name());
                    return ResponseEntity.ok(ItemTagMapper.toItemTagDTO(repository.save(tag)));
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