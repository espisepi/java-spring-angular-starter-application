package com.example.backend.features.example.item.model;

import java.util.HashSet;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "detail_id", nullable = false)
    private ItemDetail detail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ItemCategory category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ItemImage> images = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "item_tags", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<ItemTag> tags = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "related_items", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "related_item_id"))
    private Set<Item> relatedItems = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdOn;

    public Item() {
    }

    public Item(String name) {
        this.name = name;
    }

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ItemDetail getDetail() {
        return detail;
    }

    public void setDetail(ItemDetail detail) {
        this.detail = detail;
    }

    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public Set<ItemImage> getImages() {
        return images;
    }

    public void setImages(Set<ItemImage> images) {
        this.images = images;
    }

    public void addImage(ItemImage image) {
        images.add(image);
        image.setItem(this);
    }

    public Set<ItemTag> getTags() {
        return tags;
    }

    public void setTags(Set<ItemTag> tags) {
        this.tags = tags;
    }

    public void addTag(ItemTag tag) {
        tags.add(tag);
    }

    public Set<Item> getRelatedItems() {
        return relatedItems;
    }

    public void setRelatedItems(Set<Item> relatedItems) {
        this.relatedItems = relatedItems;
    }

    public void addRelatedItem(Item item) {
        relatedItems.add(item);
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }
}
