package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.backend.features.item.model.Item;
import com.example.backend.features.item.repository.ItemRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(ItemRepository itemRepository) {
        return args -> {
            itemRepository.save(new Item("Item 1"));
            itemRepository.save(new Item("Item 2"));
            itemRepository.save(new Item("Item 3"));
        };
    }
}
