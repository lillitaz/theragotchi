package com.limako.theragotchi.service;

import com.limako.theragotchi.model.Category;
import com.limako.theragotchi.model.CategoryType;
import com.limako.theragotchi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CategoryService implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        initializeCategories();
    }

    private void initializeCategories() {
        for (CategoryType type : CategoryType.values()) {
            if (!categoryRepository.existsByCategoryType(type.name())) {
                Category category = new Category();
                category.setCategoryType(type.name());
                categoryRepository.save(category);
            }
        }
    }
}



