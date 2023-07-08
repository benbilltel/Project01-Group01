package com.myApp.ecommerce.dtos.category;

import com.myApp.ecommerce.models.category.CategoryType;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.myApp.ecommerce.models.category.Category}
 */
@Data
public class CategoryDto implements Serializable {
    Long id;
    String name;
    CategoryType type;
}