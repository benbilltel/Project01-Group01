package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}