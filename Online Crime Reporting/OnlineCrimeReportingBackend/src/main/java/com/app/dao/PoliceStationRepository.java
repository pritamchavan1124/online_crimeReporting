package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Police;
import com.app.entities.PoliceStation;

public interface PoliceStationRepository extends JpaRepository<PoliceStation, Long> {

	//add method to display all police station 
	Optional<PoliceStation> findById(Long id);
}
