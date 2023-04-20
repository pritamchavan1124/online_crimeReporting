package com.app.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.ComplaintStatusDTO;
import com.app.dto.CriminalDTO;
import com.app.dto.PoliceDTO;
import com.app.entities.CaseType;
import com.app.entities.Complaint;
import com.app.entities.Criminal;
import com.app.entities.EmergencyComplaint;
import com.app.entities.Police;
import com.app.entities.PoliceStation;
import com.app.service.IComplaintService;
import com.app.service.ICriminalService;
import com.app.service.IEmergencyComplaintService;
import com.app.service.IPoliceService;
import com.app.service.IPoliceStationService;

@RestController // =@Controller + @ResponseBody
@RequestMapping("/api/policestation") // resource : class level pattern
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@Validated // added for enabling validation support for req params n path vars
public class PoliceStationController {
	
	public PoliceStationController() {
		System.out.println("In ctr of PoliceStationController");
	}
	
	//dep : service layer i/f
	@Autowired
	private IPoliceStationService policeStationService;
	
	@Autowired
	private IPoliceService policeService;
	
	@Autowired
	private ICriminalService criminalService;
	
	@Autowired
	private IComplaintService complaintService;
	
	@Autowired
	private IEmergencyComplaintService emergencyComplaintService;
	
	@Autowired
	private ModelMapper mapper;
	
	//Police Station related route

	// add req handling method(REST API endpoint) to update police station details
	@PutMapping("/updatepolicestation")
	public ResponseEntity<?> updatePoliceStation(@RequestBody PoliceStation policeStation) 
	{
		try {
			//o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return  new ResponseEntity<>(policeStationService.updatePoliceStation(policeStation),HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in police station controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	//Police related Route
	

	//add method to display police by police station id
	
	@GetMapping("/police/getallpolice")
	public List<Police> fetchAllPolice() {
		System.out.println("in fetch all ");
		return policeService.getAllPolice();
	}
	
	// add req handling method(REST API endpoint) to create a new resource : Police
	@PostMapping("/police/addpolice")
	public ResponseEntity<?> addNewPolice(@RequestBody PoliceDTO police) {
		try {
			//o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			System.out.println("in add new police " + police);// id : null
			return  new ResponseEntity<>(policeService.addPolice(police),HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in police station controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
		}
		
			
		 
	}
	
	// add req handling method(REST API endpoint) to delete police details
	@DeleteMapping("/police/{pId}")
	public String deletePolice(@PathVariable long pId)
	{
		System.out.println("In delete police api ");
		return policeService.deletePoliceById(pId);
	}
	
	// add req handling method(REST API endpoint) to get police  details by it's id
		@GetMapping("/police/getpolice/{pId}")
		public ResponseEntity<?> getPoliceDetails(@PathVariable long pId) {
			System.out.println("in get Police details");
			try {
				//o.s.http.ResponseEntity(T body,HttpStatus stsCode)
				return   new ResponseEntity<>(policeService.getPoliceDetails(pId),HttpStatus.OK);
			} catch (RuntimeException e) {
				System.out.println("err in police controller " + e);
				return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
			}
		}
		
		// add req handling method(REST API endpoint) to get police  details by Police Station id
				@GetMapping("/police/getpoliceByPoliceStation/{psId}")
				public ResponseEntity<?> getPoliceDetailsByPoliceStation(@PathVariable long psId) {
					System.out.println("in get Police details"); 
					try {
						//o.s.http.ResponseEntity(T body,HttpStatus stsCode)
						
						return   new ResponseEntity<>(policeService.getPoliceDetailsByPolicestation(psId),HttpStatus.OK);
					} catch (RuntimeException e) {
						System.out.println("err in get police by police station in police station controller " + e);
						return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
					}
					
				}

		// add req handling method(REST API endpoint) to update police station details
				@PutMapping("/updatepolice")
				public ResponseEntity<?> updatePolice(@RequestBody PoliceDTO police) {
					
					try 
					{
						System.out.println("in update police "+police);
						Police updatePolice = policeService.updatePolice(police);
						return new ResponseEntity<>(updatePolice,HttpStatus.OK);
						
					} catch (Exception e) {
						return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
					}
					
					//return policeService.updatePolice(police);
				}
				

	
	
	//criminal related routes
	
    //get all criminals
	@GetMapping("/criminal/getcriminals")
	public List<Criminal> fetchAllCriminals() {
		System.out.println("in fetch all Criminals ");
		return criminalService.getAllCriminal();
	}
	
	//get criminal by name
	@GetMapping("/criminal/{crId}")
	public ResponseEntity<?> getCriminalDetails(@PathVariable long crId) {
		System.out.println("in get criminal details by crId");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(criminalService.getCriminalById(crId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	//delete criminal by ID
	@DeleteMapping("/criminal/{crId}")
	public String deleteCriminal(@PathVariable long crId) {
		System.out.println("In delete criminal by ID api ");
		return criminalService.deleteCriminalById(crId);
	}
	
	//add criminal details
	@PostMapping("/criminal/add")
	public Criminal addCriminal(@RequestBody CriminalDTO criminal) {
		System.out.println("in update  police station dtls" + criminal);// not null id
		return criminalService.addCriminal(criminal);
	}
	
	// complaint relates
	
	@GetMapping("/complaintListForPS/{psId}")
	public ResponseEntity<?> getAllComplaintsForSpecificPoliceStation(@PathVariable long psId){
		try {System.out.println("in get all Complaints for particular Police Station "+psId);
			return new ResponseEntity<>(complaintService.getAllComplaintsForPoliceStation(psId), HttpStatus.OK);
		}
		catch(RuntimeException e) {
			System.out.println("error while deleting complaint " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/complaint/details/{complaintId}")
	public ResponseEntity<?> getComplaintDetails(@PathVariable long complaintId){
		try {System.out.println("in get Complaint Details for particular complaintId"+complaintId);
		return new ResponseEntity<>(complaintService.getDetailsOfComplaintByComplaintId(complaintId), HttpStatus.OK);
	}catch(RuntimeException e) {
		System.out.println("error while retrieving complaint " + e);
		return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
	}
	}
	
	
	
	//get all EC complaints
	@GetMapping("/emergencycomplaint/getemergencycomplaints")
	public List<EmergencyComplaint> fetchAllEmergencyComplaints() {
		System.out.println("in fetch all EmergencyComplaints ");
		return emergencyComplaintService.getAllEmergencyComplaint();
	}
	
	
	//view EC by ID
	@GetMapping("/emergencycomplaint/{ecId}")
	public ResponseEntity<?> getEmergencyComplaintDetails(@PathVariable long ecId) {
		System.out.println("in get emergencycomplaint details by ecId");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(emergencyComplaintService.getEmergencyComplaintById(ecId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/emergencycomplaintForPoliceStation/{psId}")
	public ResponseEntity<?> getEmergencyComplaintListByPsId(@PathVariable long psId) {
		
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(emergencyComplaintService.getEmergencyComplaintByPsId(psId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	//delete EC by id
	@DeleteMapping("/emergencycomplaint/{ecId}")
	public String deleteEmergencyComplaint(@PathVariable long ecId) {
		System.out.println("In delete EmergencyComplaint by ID api ");
		return emergencyComplaintService.deleteEmergencyComplaintById(ecId);
	}
	
	//add a api to update the status of complaint
	@PutMapping("/complaint/updatestatus")
	public String updateComplaintStatus(@RequestBody ComplaintStatusDTO updateStatus)
	{
		String msg="updation of status failed";
		Long id=updateStatus.getId();
		String statusToUpdate=updateStatus.getComplaintStatus();
		if(id!=null && statusToUpdate!=null)
		{
			Complaint updatedComplaint = complaintService.updateComplaintStatus(id, statusToUpdate);
			msg="Complaint status updated to  "+updatedComplaint.getComplaintStatus();
		}
		return msg;
	}

	@GetMapping("/casetype/getcasetypes")
	public List<CaseType> fetchAllCaseTypes() {
		System.out.println("in fetch all case types");
		return complaintService.getAllCaseType();

	}
	
	//complaint stats
	@GetMapping("/complaintstat")
	public ResponseEntity<?>  getComplaintStatistics(){
		return new ResponseEntity<>(complaintService.getComplaintStat(),HttpStatus.OK);
	}
}
