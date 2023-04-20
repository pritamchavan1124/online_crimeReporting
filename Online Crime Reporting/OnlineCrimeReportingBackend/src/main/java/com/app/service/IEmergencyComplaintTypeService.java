package com.app.service;

import java.util.List;

import com.app.entities.EmergencyComplaintType;

public interface IEmergencyComplaintTypeService {

	// add new emergency Type complaint
	EmergencyComplaintType addEmergencyComplaintType(EmergencyComplaintType transientEComplaintType);

	// view Emergency complaint Type by its id
	EmergencyComplaintType getEmergencyComplaintTypeById(long ecId);

	// get all the emergency Type complaint
	List<EmergencyComplaintType> getAllEmergencyComplaintType();

	// delete emergency complaint Type by it's id
	String deleteEmergencyComplaintTypeById(long ec_id);

}
