package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Police;

public interface PoliceRepository extends JpaRepository<Police, Long> {
	
	//add method to get list of police by police station Id
	@Query("select p from Police p join p.policeStation ps where ps.id=?1")
	List<Police> getPoliceByPoliceStationId(long psId);

}
