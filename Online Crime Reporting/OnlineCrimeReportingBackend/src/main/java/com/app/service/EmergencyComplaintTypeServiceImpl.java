package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.EmergencyComplaintTypeRepository;
import com.app.entities.EmergencyComplaintType;
@Service
@Transactional
public class EmergencyComplaintTypeServiceImpl implements IEmergencyComplaintTypeService {
	@Autowired
	private EmergencyComplaintTypeRepository emergencyComplaintTypeRepo;

	@Override
	public EmergencyComplaintType addEmergencyComplaintType(EmergencyComplaintType transientEComplaintType) {
		//System.out.println("in add ECtype"+transientEComplaintType);
		return emergencyComplaintTypeRepo.save(transientEComplaintType);
	}

	@Override
	public EmergencyComplaintType getEmergencyComplaintTypeById(long ect_Id) {
		System.out.println("in get ECtype by ID");
		return emergencyComplaintTypeRepo.findById(ect_Id).orElseThrow(() -> new ResourceNotFoundException("Invalid Emergency complaint type ID"));
	}

	@Override
	public List<EmergencyComplaintType> getAllEmergencyComplaintType() {
		System.out.println("in get all ECtype");
		return emergencyComplaintTypeRepo.findAll();
	}

	@Override
	public String deleteEmergencyComplaintTypeById(long ect_Id) {
		System.out.println("in delete ECtype by ID");
		String message = "Deletion of Emergency Complaint Type failed ...";
		if (emergencyComplaintTypeRepo.existsById(ect_Id)) {
			emergencyComplaintTypeRepo.deleteById(ect_Id);
			message = "Deletion of Emergency Complaint Type Id " +ect_Id+ " is Successful";
		}
		return message;
	}

}
