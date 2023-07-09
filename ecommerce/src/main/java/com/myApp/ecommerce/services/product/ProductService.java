package com.myApp.ecommerce.services.product;

import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.repositorys.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    public Product saveProduct (Product product){
        return productRepository.save(product);
    }
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }
    public Product findProductById (Long id){
        return productRepository.findById(id).orElseThrow(()->
            new ResourceNotFoundException("Product","id",id));
    }
    public void deleteById(Long id){
        productRepository.deleteById(id);
    }
}
