package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.backend.features.example.item.model.Item;
import com.example.backend.features.example.item.model.ItemCategory;
import com.example.backend.features.example.item.model.ItemDetail;
import com.example.backend.features.example.item.model.ItemImage;
import com.example.backend.features.example.item.model.ItemTag;
import com.example.backend.features.example.item.repository.ItemCategoryRepository;
import com.example.backend.features.example.item.repository.ItemRepository;
import com.example.backend.features.example.item.repository.ItemTagRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(
            ItemRepository itemRepository,
            ItemCategoryRepository categoryRepository,
            ItemTagRepository tagRepository) {
        return args -> {
            if (itemRepository.count() > 0) {
                return;
            }

            ItemCategory equipment = categoryRepository.save(new ItemCategory("Equipment"));
            ItemCategory accessory = categoryRepository.save(new ItemCategory("Accessory"));

            ItemTag featured = tagRepository.save(new ItemTag("featured"));
            ItemTag newItem = tagRepository.save(new ItemTag("new"));

            Item item1 = new Item("Item 1");
            item1.setCategory(equipment);
            item1.setDetail(new ItemDetail("Example of a one-to-one relationship."));
            item1.addImage(new ItemImage("https://example.com/item-1.png"));
            item1.addTag(featured);

            Item item2 = new Item("Item 2");
            item2.setCategory(accessory);
            item2.setDetail(new ItemDetail("Example with another category."));
            item2.addImage(new ItemImage("https://example.com/item-2.png"));
            item2.addTag(newItem);

            Item item3 = new Item("Item 3");
            item3.setCategory(equipment);
            item3.setDetail(new ItemDetail("Example of a related item."));
            item3.addTag(featured);

            item1.addRelatedItem(item2);
            item1.addRelatedItem(item3);

            itemRepository.save(item2);
            itemRepository.save(item3);
            itemRepository.save(item1);
        };
    }
}
