package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.ApiResponse;
import com.app.dto.PoliceStationDTO;
import com.app.entities.PoliceStation;

public interface IPoliceStationService {
	//add api to display police stations
	List<PoliceStation> getAllPoliceStation();
	
	//add api to insert police station
	ApiResponse addPoliceStation(PoliceStationDTO transientPoliceStation);
	
	//add api to delete police station by id
	String deletePoliceStaionById(long psId);
	
	//add api to get details of police station
	PoliceStation getPoliceStationDetails(long psid);
	
	//add api to update police station details
	PoliceStation updatePoliceStation(PoliceStation detachedPoliceStation); 
	

}
