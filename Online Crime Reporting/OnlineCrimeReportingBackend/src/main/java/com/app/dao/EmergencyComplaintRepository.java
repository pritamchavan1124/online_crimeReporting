package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Complaint;
import com.app.entities.EmergencyComplaint;

public interface EmergencyComplaintRepository extends JpaRepository<EmergencyComplaint, Long> {

	// add emergency complaint

	// get emergency complaint by id

	// delete emergency complaint by id

	// get all emergency complaint

	//add a CustomQuerymethod to get Complaints for specific PoliceStation
		@Query("select ec from EmergencyComplaint ec join ec.policeStation cp where cp.id=?1")
		List<EmergencyComplaint> findAllEmergencyComplaintsByPoliceStationId(long psId);
}
