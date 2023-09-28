package com.limako.theragotchi.repository;

import com.limako.theragotchi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryType(String categoryName);
}
