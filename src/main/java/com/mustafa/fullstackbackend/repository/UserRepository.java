package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
