package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}