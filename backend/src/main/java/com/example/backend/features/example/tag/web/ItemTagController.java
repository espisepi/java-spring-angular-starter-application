package com.example.backend.features.example.tag.web;

import com.example.backend.features.example.tag.dto.ItemTagDto;
import com.example.backend.features.example.tag.dto.TagRequestDto;
import com.example.backend.features.example.tag.dto.TagUpdateRequestDto;
import com.example.backend.features.example.tag.facade.TagFacade;
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
    private final TagFacade tagFacade;

    public ItemTagController(TagFacade tagFacade) {
        this.tagFacade = tagFacade;
    }

    @GetMapping
    public ResponseEntity<List<ItemTagDto>> findAll() {
        return ResponseEntity.ok(tagFacade.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemTagDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(tagFacade.findById(id));
    }

    @PostMapping
    public ResponseEntity<ItemTagDto> create(@RequestBody @Valid TagRequestDto request) {
        return ResponseEntity.ok(tagFacade.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemTagDto> update(
            @PathVariable Long id,
            @RequestBody @Valid TagUpdateRequestDto request) {
        return ResponseEntity.ok(tagFacade.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tagFacade.delete(id);
        return ResponseEntity.noContent().build();
    }
}