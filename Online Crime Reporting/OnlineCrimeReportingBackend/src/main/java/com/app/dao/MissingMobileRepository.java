package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.MissingMobile;
import com.app.entities.StolenVehicle;


public interface MissingMobileRepository extends JpaRepository<MissingMobile, Long> {
	//add a method to find a MissingMobile complaint by ComplaintId
	@Query("select mb from MissingMobile mb join mb.regComplaint rc where rc.id=?1")
	MissingMobile findMissingMobileComplaintByComplaintId(long complaintId);
	
	
}
