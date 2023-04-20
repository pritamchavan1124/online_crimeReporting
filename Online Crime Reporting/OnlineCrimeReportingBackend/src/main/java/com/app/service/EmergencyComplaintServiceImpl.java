package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.EmergencyComplaintRepository;
import com.app.dao.EmergencyComplaintTypeRepository;
import com.app.dao.PoliceRepository;
import com.app.dao.PoliceStationRepository;
import com.app.dto.EmergencyComplaintDTO;
import com.app.dto.PoliceDTO;
import com.app.entities.EmergencyComplaint;
import com.app.entities.Police;

@Service
@Transactional
public class EmergencyComplaintServiceImpl implements IEmergencyComplaintService {
	// dep : dao layer i/f
	@Autowired
	private EmergencyComplaintRepository ecRepo;
	
	@Autowired
	private PoliceStationRepository policeStationRepo;
	
	@Autowired
	private AddressRepository addressRepo;

	@Autowired
	private EmergencyComplaintTypeRepository ecTypeRepo;
	
	@Autowired
	private ModelMapper mapper;


	@Override
	public EmergencyComplaint addEmergencyComplaint(EmergencyComplaintDTO transientEComplaint) {
		EmergencyComplaint emergencyComplaint=mapper.map(transientEComplaint, EmergencyComplaint.class);
		emergencyComplaint.setAddress(addressRepo.findById(transientEComplaint.getAddressId()).orElseThrow(()->new ResourceNotFoundException("Address record not found")));
		emergencyComplaint.setPoliceStation(policeStationRepo.findById(transientEComplaint.getPoliceStationId()).orElseThrow(()->new ResourceNotFoundException("Police Station record not found")));
		emergencyComplaint.setEcType(ecTypeRepo.findById(transientEComplaint.getEcTypeId()).orElseThrow(()->new ResourceNotFoundException("record not found")));
		
		return ecRepo.save(emergencyComplaint);
	}
	// @Transaction method rets ---> tx boundary --> no run time exc --> tx.commit
	// --> hib performs auto dirty chking -->hib session.flush --> insert --> L1
	// cache destroyed , pooled out (Hikari) cn rets to db cp -> session closed!
	// rets EmergencyComplaint : DETACHED

	@Override
	public EmergencyComplaint getEmergencyComplaintById(long ecId) {

		return ecRepo.findById(ecId).orElseThrow(() -> new ResourceNotFoundException("Invalid Emergency Complaint ID"));
	}

	@Override
	public List<EmergencyComplaint> getAllEmergencyComplaint() {

		return ecRepo.findAll();
	}

	@Override
	public String deleteEmergencyComplaintById(long ec_id) {
		String message = "Deletion of Emergency Complaint failed ...";
		if (ecRepo.existsById(ec_id)) {
			ecRepo.deleteById(ec_id);
			message = "Deletion of Emergency Complaint Id " +ec_id+ " is Successful";
		}
		return message;
	}

	@Override
	public List<EmergencyComplaint> getEmergencyComplaintByPsId(long psId) {
		policeStationRepo.findById(psId).orElseThrow(()-> new ResourceNotFoundException("Invalid policeStationId, hence emergency complaint List retrieval failed"));
		return ecRepo.findAllEmergencyComplaintsByPoliceStationId(psId);
	}

}
