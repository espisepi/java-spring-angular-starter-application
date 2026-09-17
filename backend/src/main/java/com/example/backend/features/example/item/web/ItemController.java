package com.example.backend.features.example.item.web;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.features.example.item.dto.ItemDto;
import com.example.backend.features.example.item.dto.ItemRequestDto;
import com.example.backend.features.example.item.dto.ItemUpdateRequestDto;
import com.example.backend.features.example.item.facade.ItemFacade;
import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemFacade itemFacade;

    public ItemController(ItemFacade itemFacade) {
        this.itemFacade = itemFacade;
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {
        String sortBy = sort[0];
        String sortOrder = sort.length > 1 ? sort[1] : "asc";
        Sort parseSortParameter = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);

        Pageable pageable = PageRequest.of(page, size, parseSortParameter);
        Page<ItemDto> itemDTOs = itemFacade.findAll(pageable);
        return ResponseEntity.ok(itemDTOs.getContent());
    }

    @PostMapping
    public ResponseEntity<ItemDto> create(@RequestBody @Valid ItemRequestDto request) {
        return ResponseEntity.ok(itemFacade.create(request));
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDto> findById(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemFacade.findById(itemId));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ItemDto> update(@PathVariable Long itemId,
            @RequestBody @Valid ItemUpdateRequestDto request) {
        return ResponseEntity.ok(itemFacade.update(itemId, request));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> delete(@PathVariable Long itemId) {
        itemFacade.delete(itemId);
        return ResponseEntity.noContent().build();
    }

}
