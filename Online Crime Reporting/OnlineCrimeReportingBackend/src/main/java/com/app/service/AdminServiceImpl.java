package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CaseTypeRepository;
import com.app.dao.PoliceStationRepository;
import com.app.entities.CaseType;
import com.app.entities.PoliceStation;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	private CaseTypeRepository caseTypeRepo;

	// dep : dao layer i/f
	@Autowired
	private PoliceStationRepository policeStationRepo;

	// get all case types
	@Override
	public List<CaseType> getAllCaseType() {
		// TODO Auto-generated method stub
		return caseTypeRepo.findAll();
	}

	// get all police stations

	@Override
	public List<PoliceStation> getAllPoliceStation() {
		// TODO Auto-generated method stub
		return policeStationRepo.findAll();
	}

	@Override
	public PoliceStation addPoliceStation(PoliceStation transientPoliceStation) {

		return policeStationRepo.save(transientPoliceStation);
	}

	@Override
	public String deletePoliceStaionById(long psId) {
		String mesg = "Deleting police station failed !!!!!";
		// if you want to confirm the id :
		if (policeStationRepo.existsById(psId)) {
			policeStationRepo.deleteById(psId);
			mesg = "Deleted police station of id " + psId;
		}
		return mesg;
	}

	@Override

	public PoliceStation getPoliceStationDetails(long psId) {

		return policeStationRepo.findById(psId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Police Station Id"));
	}

	@Override
	public PoliceStation updatePoliceStation(PoliceStation detachedPoliceStation) {
		policeStationRepo.findById(detachedPoliceStation.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Invalid Police station ID!!!!!! : Can't Update details"));
		// => valid police station id
		return policeStationRepo.save(detachedPoliceStation);// update

	}

	////get case type by id
	@Override
	public CaseType getCaseTypeDetails(long csId) {
		System.out.println("in get case type by ID");
		return caseTypeRepo.findById(csId).orElseThrow(() -> new ResourceNotFoundException("Invalid Case type Id"));
	}

	@Override
	public String deleteCaseTypeById(long csId) {
		String mesg = "Deleting case type failed !";
		
		if (caseTypeRepo.existsById(csId)) {
			caseTypeRepo.deleteById(csId);
			mesg = "Deleted case type with id " + csId;
		}
		return mesg;
		
	}

	@Override
	public CaseType updateCaseType(CaseType detachedCaseType) {
		// validate case type id
		caseTypeRepo.findById(detachedCaseType.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid case type ID!!! : Can't Update details"));
		
		return caseTypeRepo.save(detachedCaseType);//update

		
	}

	@Override
	public CaseType addCaseType(CaseType transientCaseType) {
		
		return caseTypeRepo.save(transientCaseType);
	}

}
