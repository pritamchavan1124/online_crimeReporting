package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.StolenVehicle;

public interface StolenVehicleRepository extends JpaRepository<StolenVehicle, Long> {
	//add a method to find a StolenVehicle complaint by ComplaintId
	@Query("select sv from StolenVehicle sv join sv.regComplaint rc where rc.id=?1")
	StolenVehicle findStolenVehicleComplaintByComplaintId(long complaintId);
		
	//StolenVehicle getStolenVehicleComplaintByComplaintId(long complaintId);
}
