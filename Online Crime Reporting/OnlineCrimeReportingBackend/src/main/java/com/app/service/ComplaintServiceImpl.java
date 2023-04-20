package com.app.service;

import java.util.List;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CaseTypeRepository;
import com.app.dao.ComplaintRepository;
import com.app.dao.MissingMobileRepository;
import com.app.dao.MissingPersonRepository;
import com.app.dao.PoliceStationRepository;
import com.app.dao.StolenVehicleRepository;
import com.app.dao.UserRepository;
import com.app.dto.ComplaintDTO;
import com.app.dto.ComplaintStatisticsDTO;
import com.app.entities.CaseType;
import com.app.entities.Complaint;
import com.app.entities.MissingMobile;
import com.app.entities.MissingPerson;
import com.app.entities.PoliceStation;
import com.app.entities.StatusOfComplaint;
import com.app.entities.StolenVehicle;
import com.app.entities.TypeOfCase;
import com.app.entities.User;

@Service
@Transactional
public class ComplaintServiceImpl implements IComplaintService {
//dependency: ComplaintRepo and UserRepo
	@Autowired
	private ComplaintRepository compliantRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private StolenVehicleRepository stolenVehicleRepo;
	@Autowired
	private MissingPersonRepository missingPersonRepo;
	@Autowired
	private MissingMobileRepository missingMobileRepo;
	@Autowired
	private	PoliceStationRepository policeStationRepo;
	@Autowired
	private CaseTypeRepository caseTypeRepo;
	
	
	@Override
	public Complaint addComplaint(ComplaintDTO requestObj) {
		Long userId=requestObj.getComplainantId();//retrieval of userid from complainant
		Long policeStationId = requestObj.getPoliceStationId();
		Long caseTypeSelectedId = requestObj.getCaseTypeSelected();
		User user=null;
		CaseType ct=null;
		PoliceStation ps=null;
		if(userId!=null) {//check for valid User(only registered users will be allowed) ow throw RESNOTFOUND exception 
		user=userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Invalid UserId, hence complaint registration failed"));
		ps=policeStationRepo.findById(policeStationId).orElseThrow(()-> new ResourceNotFoundException("No corresponding Police Station Record found"));
		ct=caseTypeRepo.findById(caseTypeSelectedId).orElseThrow(()-> new ResourceNotFoundException("No corresponding Case Type Record found"));
		}
		
		Complaint complaint=new Complaint(requestObj.getReportingDate(),requestObj.getDescription(),requestObj.getCrimeDate(),
				requestObj.getCrimeTime(),requestObj.getVictimName(),requestObj.getSuspect(),requestObj.getLocation(),requestObj.getMobileNo(),
				StatusOfComplaint.PENDING,requestObj.getRelationWithVictim(),user,ct,ps);
		//Complaint savedComplaint = compliantRepo.save(complaint);//does here insertion of record takes in db takes place or does it only takes places while returning??
		
		//System.out.println("Saved Complaint Id: "+savedComplaint.getId());//TODO: check for non-null
		
		//according to caseType the further insertion into respective tables will take place
		//here we have 3 prominent case Types Stolen Vehicle, Missing Mobile & Missing Person
//		if(requestObj.getCaseType().getCaseType()==TypeOfCase.MVT) {
//			StolenVehicle stolenVehicle = addStolenVehicleComplaint(requestObj.getStolenvehicle(),savedComplaint);		
//		}
		return compliantRepo.save(complaint); 
	}//tx.commit()

	@Override
	public StolenVehicle addStolenVehicleComplaint(StolenVehicle vehicle, Complaint registeredcomplaint) {
		StolenVehicle sv=new StolenVehicle(vehicle.getRegNo(),vehicle.getCompanyName(),vehicle.getChassisNo(),vehicle.getModelName(),vehicle.getVehicleType(),registeredcomplaint);//FK Constraint should not fail here
		return stolenVehicleRepo.save(sv);
	}

	@Override
	public Complaint addEntireComplaint(ComplaintDTO requestObject) {//should we return ComplaintDTO instead of Complaint as ComplaintDTO has entire Complaint
		Complaint registeredComplaint = addComplaint(requestObject);
		
		//according to caseType the further insertion into respective tables will take place
		//here we have 3 prominent case Types Stolen Vehicle, Missing Mobile & Missing Person
		Long caseTypeSelectedId = requestObject.getCaseTypeSelected();
		CaseType ct =caseTypeRepo.findById(caseTypeSelectedId).orElseThrow(()-> new ResourceNotFoundException("No corresponding Case Type Record found"));
		if(ct.getCaseType()==TypeOfCase.MOTOR_VEHICLE_THEFT) {
			StolenVehicle stolenVehicle = addStolenVehicleComplaint(requestObject.getStolenVehicle(),registeredComplaint);
			System.out.println(stolenVehicle.toString());//Check purpose
		}else if(ct.getCaseType()==TypeOfCase.MISSING_CHILD_OR_PERSON) {
			MissingPerson mp = addMissingPerson(requestObject.getMissingBeing(),registeredComplaint);
			System.out.println(mp.toString());//Check purpose
		}else if(ct.getCaseType()==TypeOfCase.MISSING_OR_STOLEN_MOBILE_PHONES) {
			MissingMobile mb = addMissingMobile(requestObject.getMissingMobile(),registeredComplaint);
			System.out.println(mb.toString());//Check purpose
		}
		return registeredComplaint;
	}

	@Override
	public MissingPerson addMissingPerson(MissingPerson missingBeing, Complaint registeredcomplaint) {
		MissingPerson mp=new MissingPerson(missingBeing.getName(),missingBeing.getAge(),missingBeing.getGender(),missingBeing.getHeight(),registeredcomplaint);
		return missingPersonRepo.save(mp);
	}

	@Override
	public MissingMobile addMissingMobile(MissingMobile missingMobile, Complaint registeredcomplaint) {
		MissingMobile mb=new MissingMobile(missingMobile.getImei(),missingMobile.getCompany(),missingMobile.getModel(),missingMobile.getSimCardCompanyName(),missingMobile.getMobileNoInMissingMobile(),registeredcomplaint);
		return missingMobileRepo.save(mb);
	}

	@Override
	public List<Complaint> getAllComplaints(long userId) {
			//check for valid User(only registered users will be allowed) ow throw RESNOTFOUND exception 
			userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Invalid UserId, hence complaint List retrieval failed"));
			return compliantRepo.findAllComplaintsByComplainantId(userId);
	}

	@Override
	public List<Complaint> getAllComplaintsForPoliceStation(long policeStationId) {
		//check for Valid Police Station Id
		policeStationRepo.findById(policeStationId).orElseThrow(()-> new ResourceNotFoundException("Invalid policeStationId, hence complaint List retrieval failed"));
		return compliantRepo.findAllComplaintsByPoliceStationId(policeStationId);
	}

	@Override
	public String deleteEntireComplaint(long complaintId) {
		String mesg = "Deleting Complaint failed!";
		String subMesg="";
		if(compliantRepo.existsById(complaintId)) {
			Complaint complaintMarkedForDeletion = compliantRepo.findById(complaintId).orElseThrow(()-> new ResourceNotFoundException("Invalid ComplaintId, Complaint Deletion Failed"));
			
			//according to caseType the further deletion from respective tables will take place
			//here we have 3 prominent case Types Stolen Vehicle, Missing Mobile & Missing Person
			if(complaintMarkedForDeletion.getCaseTypeSelected().getCaseType()==TypeOfCase.MOTOR_VEHICLE_THEFT)
			{	StolenVehicle stolenVehicleTobeMarkedForDeletion = stolenVehicleRepo.findStolenVehicleComplaintByComplaintId(complaintId);
				if(stolenVehicleTobeMarkedForDeletion!=null) {
					stolenVehicleRepo.delete(stolenVehicleTobeMarkedForDeletion);
					subMesg="And Deletion of Stolen Vehicle Case Type deletion is also Successfull";
				}
			}else if(complaintMarkedForDeletion.getCaseTypeSelected().getCaseType()==TypeOfCase.MISSING_CHILD_OR_PERSON) {
				MissingPerson missingPersonTobeMarkedForDeletion = missingPersonRepo.findMissingPersonComplaintByComplaintId(complaintId);
				if(missingPersonTobeMarkedForDeletion!=null) {
					missingPersonRepo.delete(missingPersonTobeMarkedForDeletion);
					subMesg="And Deletion of Missing Person Case Type deletion is also Successfull";
				}
			}else if(complaintMarkedForDeletion.getCaseTypeSelected().getCaseType()==TypeOfCase.MISSING_OR_STOLEN_MOBILE_PHONES) {
				MissingMobile missingMobileTobeMarkedForDeletion = missingMobileRepo.findMissingMobileComplaintByComplaintId(complaintId);
				if(missingMobileTobeMarkedForDeletion!=null) {
					missingMobileRepo.delete(missingMobileTobeMarkedForDeletion);
					subMesg="And Deletion of Missing Mobile Case Type deletion is also Successfull";
				}			
			}

			compliantRepo.deleteById(complaintId);
			mesg="Entire Deletion of complaint is Successfull! ";
		}
		return mesg.concat(subMesg);
	}

	@Override
	public Complaint updateComplaintStatus(long complaintId, String status) {
		Complaint complaintToBeUpdated = compliantRepo.findById(complaintId).orElseThrow(()-> new ResourceNotFoundException("Invalid ComplaintId, Complaint Status Updation Failed"));
		if((status.toUpperCase()).equals(StatusOfComplaint.INPROCESS.name())) {
			complaintToBeUpdated.setComplaintStatus(StatusOfComplaint.INPROCESS);
		}else if((status.toUpperCase()).equals(StatusOfComplaint.RESOLVED.name())) {
			complaintToBeUpdated.setComplaintStatus(StatusOfComplaint.RESOLVED);
		}
		return compliantRepo.save(complaintToBeUpdated);//Update
	}

	@Override
	public long numberOfComplaintsInProcessOrResolved() {
		return compliantRepo.numberOfComplaintsInProcessOrResolved();
	}

	@Override
	public StolenVehicle getStolenVehicleComplaintByComplaintId(long complaintId) {
		StolenVehicle stolenVehicleTobeMarkedForRetrieval=null;
		//check for Valid Complaint Id
		if(compliantRepo.existsById(complaintId)) 
		{	Complaint complaintMarkedForRetrieval = compliantRepo.findById(complaintId).orElseThrow(()-> new ResourceNotFoundException("Invalid ComplaintId, Complaint Retrieval Failed"));
				if(complaintMarkedForRetrieval.getCaseTypeSelected().getCaseType()==TypeOfCase.MOTOR_VEHICLE_THEFT)
				{	stolenVehicleTobeMarkedForRetrieval = stolenVehicleRepo.findStolenVehicleComplaintByComplaintId(complaintId);
				}
		}
		return stolenVehicleTobeMarkedForRetrieval;
	}

	@Override
	public Object getDetailsOfComplaintByComplaintId(long complaintId) {

		//check for Valid Complaint Id
		String msg="No specific details available for this complaint";
				if(compliantRepo.existsById(complaintId)) 
				{	Complaint complaintMarkedForRetrieval = compliantRepo.findById(complaintId).orElseThrow(()-> new ResourceNotFoundException("Invalid ComplaintId, Complaint Retrieval Failed"));
					System.out.println("Complaint marked "+complaintMarkedForRetrieval);	
				if(complaintMarkedForRetrieval.getCaseTypeSelected().getCaseType()==TypeOfCase.MOTOR_VEHICLE_THEFT)
						{	return stolenVehicleRepo.findStolenVehicleComplaintByComplaintId(complaintId);
						}
						else if(complaintMarkedForRetrieval.getCaseTypeSelected().getCaseType()==TypeOfCase.MISSING_OR_STOLEN_MOBILE_PHONES) {
							return missingMobileRepo.findMissingMobileComplaintByComplaintId(complaintId);
						}
						else if(complaintMarkedForRetrieval.getCaseTypeSelected().getCaseType()==TypeOfCase.MISSING_CHILD_OR_PERSON) {
							return missingPersonRepo.findMissingPersonComplaintByComplaintId(complaintId);
						}
				}
		return msg;
	}

	@Override
	public List<CaseType> getAllCaseType() {
		return caseTypeRepo.findAll();
	}

	@Override
	public List<PoliceStation> getAllPoliceStation() {
		return policeStationRepo.findAll();
	}

	@Override
	public List<ComplaintStatisticsDTO> getComplaintStat() {
		
		return compliantRepo.getComplaintStatistics();
	}

	@Override
	public List<Complaint> fetchAllComplaints() {
		
		return compliantRepo.findAll();
	}
	
		
		
		
		
		
		
		
}
