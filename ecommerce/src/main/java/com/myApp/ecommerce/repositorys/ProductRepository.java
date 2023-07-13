package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_Id(Long id);

}