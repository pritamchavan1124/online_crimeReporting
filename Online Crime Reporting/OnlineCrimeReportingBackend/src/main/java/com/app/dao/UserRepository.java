package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
	//method for User Login
 
	Optional<User> findByEmailAndPassword(String email,String password);
	
	//find by email method
	Optional<User> findByEmail(String email);
	

}
