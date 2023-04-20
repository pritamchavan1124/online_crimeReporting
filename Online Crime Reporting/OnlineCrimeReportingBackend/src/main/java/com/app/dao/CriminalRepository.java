package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Criminal;

public interface CriminalRepository extends JpaRepository<Criminal, Long> {
	
	//add criminal -> save inherited method
	
	//get criminal by name -> finder method
	Optional<Criminal> findBycrName(String crName);
	
	//get all criminals -> Inherited method
	//findAll();
	
	//delete criminal by id-> Inherited method deleteById();

}
