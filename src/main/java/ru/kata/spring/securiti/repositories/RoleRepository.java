package ru.kata.spring.securiti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.securiti.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
