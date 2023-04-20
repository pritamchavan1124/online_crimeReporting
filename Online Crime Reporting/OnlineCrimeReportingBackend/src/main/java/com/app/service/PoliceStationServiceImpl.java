package com.app.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
//import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.custom_exception.UserAlreadyExistException;
import com.app.dao.AddressRepository;
import com.app.dao.DivisionRepository;
import com.app.dao.PoliceStationRepository;
import com.app.dao.SecurityQuestionRepository;
import com.app.dao.UserRepository;
import com.app.dto.ApiResponse;
import com.app.dto.PoliceStationDTO;
import com.app.dto.UserDTO;
import com.app.entities.PoliceStation;
import com.app.entities.User;

@Service
@Transactional
public class PoliceStationServiceImpl implements IPoliceStationService {

	// dep : dao layer i/f
	@Autowired
	private PoliceStationRepository policeStationRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	//dep : model mapper bean : used for mapping between : Entity n DTO
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private SecurityQuestionRepository secqRepo;
	
	@Autowired
	private DivisionRepository divRepo;
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public List<PoliceStation> getAllPoliceStation() {
		// TODO Auto-generated method stub
		return policeStationRepo.findAll();
	}


	
	private boolean emailExists(String email) 
	  {		Optional<User> user = userRepo.findByEmail(email);
	  		System.out.println("     >>     "+user);
	  		if(user.isEmpty())
	  			return false;
		  return true; 
	  }
	
	@Override
	public ApiResponse addPoliceStation(PoliceStationDTO transientPoliceStation) {
		if (emailExists(transientPoliceStation.getEmail())) 
			{throw new UserAlreadyExistException("There already has an account with that email: " + transientPoliceStation.getEmail()); 
			}
		PoliceStation psUser = mapper.map(transientPoliceStation,PoliceStation.class);
		psUser.setRole(transientPoliceStation.getRole());//might be this is optional
		psUser.setPassword(encoder.encode(transientPoliceStation.getPassword()));
		psUser.setAddress(addressRepo.findById(transientPoliceStation.getAddressId()).orElseThrow(()->new ResourceNotFoundException("No such corresponding address in the record")));
		psUser.setSecurityQuestion(secqRepo.findById(transientPoliceStation.getSecurityQuestionId()).orElseThrow(()->new ResourceNotFoundException("No such corresponding security question in the record")));
		psUser.setDivision(divRepo.findById(transientPoliceStation.getDivisionId()).orElseThrow(()->new ResourceNotFoundException("No such corresponding division in the record")));
		PoliceStation persistentpsUser = policeStationRepo.save(psUser);
		return new ApiResponse("Police Station registered Succesfully with ID: "+persistentpsUser.getId());
		
	}


	@Override
	public String deletePoliceStaionById(long psId) {
		String mesg = "Deleting police station failed !!!!!";
		
		PoliceStation psToDel = policeStationRepo.findById(psId).get();
		if(psToDel!=null) 
		{
			policeStationRepo.delete(psToDel);
			mesg="Deleted succesfully ";
		}
		
		return mesg;
	}

	@Override

	public PoliceStation getPoliceStationDetails(long psId) {
		
		return policeStationRepo.findById(psId).get();
	}
	


	@Override
	public PoliceStation updatePoliceStation(PoliceStation detachedPoliceStation) {
		PoliceStation policeStationToUpdate = policeStationRepo.findById(detachedPoliceStation.getId()).get();
		//=> valid police station id
		PoliceStation updatedPoliceStation=null;
		if(policeStationToUpdate!=null)
		{
			policeStationToUpdate.setMobileNo(detachedPoliceStation.getMobileNo());
			updatedPoliceStation=policeStationRepo.save(policeStationToUpdate);//update
		}
		return updatedPoliceStation;

	}

}
