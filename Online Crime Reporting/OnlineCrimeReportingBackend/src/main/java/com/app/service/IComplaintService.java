package com.app.service;

import java.util.List;

import com.app.dto.ComplaintDTO;
import com.app.dto.ComplaintStatisticsDTO;
import com.app.entities.CaseType;
import com.app.entities.Complaint;
import com.app.entities.MissingMobile;
import com.app.entities.MissingPerson;
import com.app.entities.PoliceStation;
import com.app.entities.StolenVehicle;

public interface IComplaintService {
	
	//add a method to add complaint for a particular User
	Complaint addComplaint(ComplaintDTO requestObject);
	
	//add a method to add StolenVehicle case type Complaint 
	StolenVehicle addStolenVehicleComplaint(StolenVehicle vehicle, Complaint registeredcomplaint);
	
	//add a wrapper method for addition of complaint
	Complaint addEntireComplaint (ComplaintDTO requestObject);
	//We might also keep only above wrapper class method and make other methods as Impl Class specific methods 
	
	//add a method to add MissingPerson case type Complaint
	MissingPerson addMissingPerson(MissingPerson missingBeing, Complaint registeredcomplaint);	
	
	//add a method to add MissingMobile case type Complaint
	MissingMobile addMissingMobile(MissingMobile missingMobile, Complaint registeredcomplaint);	
	
	//add a method to get all Complaints for particular Complainant
	List<Complaint> getAllComplaints(long userId);
	
	//add a method to get all Complaints for particular PoliceStation
	List<Complaint> getAllComplaintsForPoliceStation(long policeStationId);
	
	//add a wrapper method to withdraw the entireComplaint
	String deleteEntireComplaint(long complaintId);
	
	//add a method to mark the status of Complaint 
	Complaint updateComplaintStatus(long complaintId, String status);
	
	//add a method to give the no. of reports confirmed By PS
	long numberOfComplaintsInProcessOrResolved();
	
	//add a method to find a StolenVehicle complaint by ComplaintId
	StolenVehicle getStolenVehicleComplaintByComplaintId(long complaintId);
	
	//add a general method to get the complaint details corresponding to given complaintID
	Object getDetailsOfComplaintByComplaintId(long complaintId); 
	
	//add a method to get all case types
	List<CaseType> getAllCaseType();
	
	//add a method to get all PoliceStations
	List<PoliceStation> getAllPoliceStation();
	
	//add a method to get complaint Stat
	List<ComplaintStatisticsDTO> getComplaintStat();

	List<Complaint> fetchAllComplaints();
}

