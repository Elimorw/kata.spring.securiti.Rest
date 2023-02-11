package ru.kata.spring.securiti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.securiti.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername (String username);
}