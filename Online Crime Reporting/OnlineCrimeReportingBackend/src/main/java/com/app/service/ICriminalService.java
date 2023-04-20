package com.app.service;

import java.util.List;

import com.app.dto.CriminalDTO;
import com.app.entities.Criminal;

public interface ICriminalService {
	
	//add criminal 
	Criminal addCriminal(CriminalDTO criminal);
	
	//get criminal by name
	Criminal getCriminalById(long crId);
	
	//get all criminal list
	List<Criminal> getAllCriminal();
	
	//delete criminal by id
	String deleteCriminalById(long cr_id);

}
