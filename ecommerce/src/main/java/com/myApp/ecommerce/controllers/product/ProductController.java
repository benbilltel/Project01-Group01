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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
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
        productDtos.add(productDto);
    }
    return ResponseEntity.ok(productDtos);
}

    @PostMapping(value = "/",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> insertProduct (@RequestParam("name")String name,
                                                     @RequestParam("price")BigDecimal price,
                                                     @RequestParam("description")String description,
                                                     @RequestParam("categoryId")Long idCategory,
                                                     @RequestParam("status")ProductStatus status,
                                                     @RequestPart("image")MultipartFile image)throws IOException {
    ProductDto productDto = new ProductDto();
    productDto.setName(name);
    productDto.setStatus(status);
    productDto.setDescription(description);
    productDto.setPrice(price);
    Category category = categoryService.getCategoryById(idCategory);
    CategoryDto categoryDto = modelMapper.map(category,CategoryDto.class);
    productDto.setCategory(categoryDto);
    String base64Ima = Base64.getEncoder().encodeToString(image.getBytes());
    productDto.setImage(base64Ima);
    Product product = modelMapper.map(productDto, Product.class);
    Product savedProduct = productService.saveProduct(product);
    ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
        return ResponseEntity.ok(savedProductDto);
    }
}
