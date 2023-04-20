package com.app.service;

import java.util.List;

import com.app.dto.EmergencyComplaintDTO;
import com.app.entities.EmergencyComplaint;

public interface IEmergencyComplaintService {

	// add new emergency complaint
	EmergencyComplaint addEmergencyComplaint(EmergencyComplaintDTO transientEComplaint);

	// view Emergency complaint by its id
	EmergencyComplaint getEmergencyComplaintById(long ecId);

	// get all the emergency complaint
	List<EmergencyComplaint> getAllEmergencyComplaint();

	// delete emergency complaint by it's id
	String deleteEmergencyComplaintById(long ec_id);
	
	
	// get all the emergency complaint
		List<EmergencyComplaint> getEmergencyComplaintByPsId(long psId);

}
