package com.example.backend.features.example.category.web;

import com.example.backend.features.example.category.dto.ItemCategoryDto;
import com.example.backend.features.example.category.dto.CategoryRequestDto;
import com.example.backend.features.example.category.dto.CategoryUpdateRequestDto;
import com.example.backend.features.example.category.facade.CategoryFacade;
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
    private final CategoryFacade categoryFacade;

    public ItemCategoryController(CategoryFacade categoryFacade) {
        this.categoryFacade = categoryFacade;
    }

    @GetMapping
    public ResponseEntity<List<ItemCategoryDto>> findAll() {
        return ResponseEntity.ok(categoryFacade.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCategoryDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryFacade.findById(id));
    }

    @PostMapping
    public ResponseEntity<ItemCategoryDto> create(@RequestBody @Valid CategoryRequestDto request) {
        return ResponseEntity.ok(categoryFacade.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCategoryDto> update(
            @PathVariable Long id,
            @RequestBody @Valid CategoryUpdateRequestDto request) {
        return ResponseEntity.ok(categoryFacade.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryFacade.delete(id);
        return ResponseEntity.noContent().build();
    }
}