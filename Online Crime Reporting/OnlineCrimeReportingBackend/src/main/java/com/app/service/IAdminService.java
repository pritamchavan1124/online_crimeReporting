package com.app.service;

import java.util.List;

import com.app.entities.CaseType;
import com.app.entities.PoliceStation;

public interface IAdminService {
	// get all case types
	List<CaseType> getAllCaseType();

	// get case type by id
	CaseType getCaseTypeDetails(long csId);

	// delete case type by id
	String deleteCaseTypeById(long csId);

	// update case type
	CaseType updateCaseType(CaseType detachedCaseType);

	// add case type
	CaseType addCaseType(CaseType transientCaseType);

	// *********police station ***********
	// add api to display police stations
	List<PoliceStation> getAllPoliceStation();

	// add api to insert police station
	PoliceStation addPoliceStation(PoliceStation transientPoliceStation);

	// add api to delete police station by id
	String deletePoliceStaionById(long psId);

	// add api to get details of police station
	PoliceStation getPoliceStationDetails(long psid);

	// add api to update police station details
	PoliceStation updatePoliceStation(PoliceStation detachedPoliceStation);

}
