package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.PoliceDTO;
import com.app.entities.Police;
import com.app.entities.PoliceStation;

public interface IPoliceService {

	//add api to display police 
	List<Police> getAllPolice();
		
	//add api to insert police 
	Police addPolice(PoliceDTO transientPolice);
		
	//add api to delete police by id
	String deletePoliceById(long pId);
		
	//add api to get details of police
	Police getPoliceDetails(long pId);
		
	//add api to update police details
	Police updatePolice(PoliceDTO detachedPolice); 
	
	List<Police> getPoliceDetailsByPolicestation(long psId);
	
}
