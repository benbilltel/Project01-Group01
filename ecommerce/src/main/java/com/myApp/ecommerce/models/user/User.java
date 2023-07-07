package com.myApp.ecommerce.models.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;
    @Column(name = "userName", nullable = false, length = 18,
    unique = true)
    private String userName;
    @Column(name = "password", nullable = false, length = 18,unique = true)
    private String password;
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Column(name = "phone_number", nullable = false, unique = true)
    private Integer phoneNumber;
    @Enumerated
    @Column(name="type",nullable = false)
    private UseType type;



}