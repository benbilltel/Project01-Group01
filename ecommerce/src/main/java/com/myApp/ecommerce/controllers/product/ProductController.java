package com.myApp.ecommerce.controllers.product;

import com.myApp.ecommerce.dtos.category.CategoryDto;
import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.models.category.Category;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.models.product.ProductStatus;
import com.myApp.ecommerce.services.category.CategoryService;
import com.myApp.ecommerce.services.product.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ModelMapper modelMapper;
@GetMapping("/")
public ResponseEntity<List<ProductDto>> getAllProducts (){
    List<Product> products = productService.getAllProduct();
    List<ProductDto> productDtos = new ArrayList<>();
    for (Product product : products) {
        ProductDto productDto = modelMapper.map(product, ProductDto.class);
        Category category = categoryService.getCategoryById(product.getCategory().getId());
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        productDto.setCategory(categoryDto);
        productDtos.add(productDto);
    }
    return ResponseEntity.ok(productDtos);
}

    @PostMapping("/")
    public ResponseEntity<ProductDto> insertProduct (@RequestBody ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        Product savedProduct = productService.saveProduct(product);
        Category category = categoryService.getCategoryById(savedProduct.getCategory().getId());
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
        savedProductDto.setCategory(categoryDto);
        return ResponseEntity.ok(savedProductDto);
    }
}
