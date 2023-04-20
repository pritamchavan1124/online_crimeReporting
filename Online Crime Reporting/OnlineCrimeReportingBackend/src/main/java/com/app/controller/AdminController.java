package com.app.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.PoliceStationDTO;
import com.app.entities.CaseType;
import com.app.entities.Complaint;
import com.app.entities.Criminal;
import com.app.entities.Division;
import com.app.entities.EmergencyComplaint;
import com.app.entities.EmergencyComplaintType;
import com.app.entities.MissingMobile;
import com.app.entities.MissingPerson;
import com.app.entities.PoliceStation;
import com.app.entities.StolenVehicle;
import com.app.service.IAdminService;
import com.app.service.IComplaintService;
import com.app.service.ICriminalService;
import com.app.service.IDivisionService;
import com.app.service.IEmergencyComplaintService;
import com.app.service.IEmergencyComplaintTypeService;
import com.app.service.IMissingMobileService;
import com.app.service.IMissingPersonService;
import com.app.service.IPoliceStationService;
import com.app.service.IStolenVehicleService;

@RestController // =@Controller + @ResponseBody
@RequestMapping("/api/admin") // resource : class level pattern
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@Validated // added for enabling validation support for req params n path vars

public class AdminController {

	@Autowired
	private IAdminService adminService;

	// dep : service layer i/f
	@Autowired
	private IPoliceStationService policeStationService;

	@Autowired
	private ICriminalService criminalService;

	@Autowired
	private IComplaintService complaintService;

	@Autowired
	private IEmergencyComplaintService emergencyComplaintService;

	@Autowired
	private IEmergencyComplaintTypeService emergencyComplaintTypeService;

	@Autowired
	private IStolenVehicleService stolenVehicleService;

	@Autowired
	private IMissingMobileService missingMobileService;

	@Autowired
	private IMissingPersonService missingPersonService;

	@Autowired
	private IDivisionService divService;

	public AdminController() {
		super();
		System.out.println("in ctor of  Admin controller");
	}

//get all case types
	@GetMapping("/casetype")
	public List<CaseType> fetchAllCaseTypes() {
		System.out.println("in fetch all case types");
		List<CaseType> cs = adminService.getAllCaseType();
		for (CaseType ct : cs) {
			// ct.setDeatils(ct.getCaseType().getCaseName()?ct.getCaseType().getCaseName():"Deafault");
			System.out.println(ct);
		}

		return cs;

	}

	// get case type by id
	@GetMapping("/casetype/{csId}")
	public ResponseEntity<?> getCaseTypeDetails(@PathVariable long csId) {
		System.out.println("in get case type details");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(adminService.getCaseTypeDetails(csId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	// delete case type by id
	@DeleteMapping("/casetype/{csId}")
	public String deleteCaseType(@PathVariable long csId) {
		System.out.println("In delete case type api ");
		return adminService.deleteCaseTypeById(csId);
	}

	// update case type
	@PutMapping("/casetype/update")
	public @ResponseBody CaseType updateCaseType(@RequestBody CaseType caseType) {
		System.out.println("in update  case type details" + caseType);// not null id
		return adminService.updateCaseType(caseType);
	}

	// add case type
	@PostMapping("/casetype/add")
	public CaseType addCaseType(@RequestBody CaseType caseType) {
		System.out.println("in update  CaseType details" + caseType);// not null id
		return adminService.addCaseType(caseType);
	}

	// add method to display all police stations
	// @PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/policestation/getpolicestations")
	public List<PoliceStation> fetchAllPoliceStation() {
		System.out.println("in fetch all ");
		return policeStationService.getAllPoliceStation();
	}

	// add req handling method(REST API endpoint) to create a new resource :
	// PoliceStation
	// @PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/policestation/add")
	public ResponseEntity<?> addNewPoliceStation(@RequestBody PoliceStationDTO pst) {
		System.out.println("in add new police station " + pst);// id : null

		try {
			System.out.println("in register new user " + pst.getName());
			return ResponseEntity.status(HttpStatus.CREATED).body(policeStationService.addPoliceStation(pst));

		} catch (RuntimeException e) {
			System.out.println("error while registering new user " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}

	}

	// add req handling method(REST API endpoint) to delete police station details
	@DeleteMapping("/policestation/{psId}")
	public ResponseEntity<?> deletePoliceStation(@PathVariable long psId) {
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(policeStationService.deletePoliceStaionById(psId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}

	}

	// add req handling method(REST API endpoint) to get police station details by
	// it's id
	@GetMapping("/policestation/{psId}")
	public ResponseEntity<?> getPoliceStationDetails(@PathVariable long psId) {
		System.out.println("in get Police Station details");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(policeStationService.getPoliceStationDetails(psId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	// add req handling method(REST API endpoint) to update police station details
	@PutMapping("/policestation/update")
	public ResponseEntity<?> updatePoliceStation(@RequestBody PoliceStation policeStation) {

		try {
			return new ResponseEntity<>(policeStationService.updatePoliceStation(policeStation), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}

	}

	// complaint related api

	/*
	 * TODO:This following api needs to be moved to PoliceStationController and not
	 * a part of UserController
	 */
	@GetMapping("/complaintListForPS/{psId}")
	public ResponseEntity<?> getAllComplaintsForSpecificPoliceStation(@PathVariable long psId) {
		try {
			System.out.println("in get all Complaints for particular Police Station " + psId);
			return new ResponseEntity<>(complaintService.getAllComplaintsForPoliceStation(psId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("error while deleting complaint " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	// criminal related routes

	// get all criminals
	@GetMapping("/criminal/getcriminals")
	public List<Criminal> fetchAllCriminals() {
		System.out.println("in fetch all Criminals ");
		return criminalService.getAllCriminal();
	}

	// get criminal by name
//	@GetMapping("/criminal/{crName}")
//	public ResponseEntity<?> getCriminalDetails(@PathVariable String crName) {
//		System.out.println("in get criminal details by crName");
//		try {
//			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
//			return new ResponseEntity<>(criminalService.getCriminalByName(crName), HttpStatus.OK);
//		} catch (RuntimeException e) {
//			System.out.println("err in Admin controller " + e);
//			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
//		}
//	}

	// delete criminal by ID
	@DeleteMapping("/criminal/{crId}")
	public String deleteCriminal(@PathVariable long crId) {
		System.out.println("In delete criminal by ID api ");
		return criminalService.deleteCriminalById(crId);
	}

	// add criminal details
//	@PostMapping("/criminal/add")
//	public Criminal addCriminal(@RequestBody Criminal criminal) {
//		System.out.println("in update  criminal dtls" + criminal);// not null id
//		return criminalService.addCriminal(criminal);
//	}

	// get all EC complaints
	@GetMapping("/emergencycomplaint/getemergencycomplaints")
	public List<EmergencyComplaint> fetchAllEmergencyComplaints() {
		System.out.println("in fetch all EmergencyComplaints ");
		return emergencyComplaintService.getAllEmergencyComplaint();
	}

	// view EC by ID
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

	// delete EC by id
	@DeleteMapping("/emergencycomplaint/{ecId}")
	public String deleteEmergencyComplaint(@PathVariable long ecId) {
		System.out.println("In delete EmergencyComplaint by ID api ");
		return emergencyComplaintService.deleteEmergencyComplaintById(ecId);
	}

	// get all EC type complaints
	@GetMapping("/emergencycomplainttype/getemergencycomplainttypes")
	public List<EmergencyComplaintType> fetchAllEmergencyComplaintTypes() {
		System.out.println("in fetch all EmergencyComplaints type ");
		return emergencyComplaintTypeService.getAllEmergencyComplaintType();
	}

	// view EC type by ID
	@GetMapping("/emergencycomplainttype/{ect_Id}")
	public ResponseEntity<?> getEmergencyComplaintTypeDetails(@PathVariable long ect_Id) {
		System.out.println("in get emergencycomplaint type details by ecId");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(emergencyComplaintTypeService.getEmergencyComplaintTypeById(ect_Id),
					HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Admin controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	// delete EC type by id
	@DeleteMapping("/emergencycomplainttype/{ect_Id}")
	public String deleteEmergencyComplaintType(@PathVariable long ect_Id) {
		System.out.println("In delete EmergencyComplaint type by ID api ");
		return emergencyComplaintTypeService.deleteEmergencyComplaintTypeById(ect_Id);
	}

	// add new emergency complaint type
	@PostMapping("/emergencycomplainttype/add")
	public EmergencyComplaintType addEmergencyComplaintType(
			@RequestBody EmergencyComplaintType transientEComplaintType) {
		System.out.println("in add emergency complaint type dtls" + transientEComplaintType);// not null id
		return emergencyComplaintTypeService.addEmergencyComplaintType(transientEComplaintType);
	}

//	// get all EC type complaints
//	@GetMapping("/emergencycomplainttype/getemergencycomplainttypes")
//	public List<EmergencyComplaintType> fetchAllEmergencyComplaintTypes() {
//		System.out.println("in fetch all EmergencyComplaints type ");
//		return emergencyComplaintTypeService.getAllEmergencyComplaintType();
//	}
//
//	// view EC type by ID
//	@GetMapping("/emergencycomplainttype/{ect_Id}")
//	public ResponseEntity<?> getEmergencyComplaintTypeDetails(@PathVariable long ect_Id) {
//		System.out.println("in get emergencycomplaint type details by ecId");
//		try {
//			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
//			return new ResponseEntity<>(emergencyComplaintTypeService.getEmergencyComplaintTypeById(ect_Id),
//					HttpStatus.OK);
//		} catch (RuntimeException e) {
//			System.out.println("err in Admin controller " + e);
//			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
//		}
//	}
//
//	// delete EC type by id
//	@DeleteMapping("/emergencycomplainttype/{ect_Id}")
//	public String deleteEmergencyComplaintType(@PathVariable long ect_Id) {
//		System.out.println("In delete EmergencyComplaint type by ID api ");
//		return emergencyComplaintTypeService.deleteEmergencyComplaintTypeById(ect_Id);
//	}
//
//	// add new emergency complaint type
//	@PostMapping("/emergencycomplainttype/add")
//	public EmergencyComplaintType addEmergencyComplaintType(
//			@RequestBody EmergencyComplaintType transientEComplaintType) {
//		System.out.println("in add emergency complaint type dtls" + transientEComplaintType);// not null id
//		return emergencyComplaintTypeService.addEmergencyComplaintType(transientEComplaintType);
//	}

	// get all division
	@GetMapping("/division")
	public List<Division> fetchAllDivision() {
		System.out.println("in fetch all Division ");
		return divService.getAllDivisions();
	}

	// get all sv record
	@GetMapping("/getstolenvehiclerecord")
	public List<StolenVehicle> fetchAllStolenVehicle() {
		System.out.println("in fetch all Stolen Vehicle ");
		return stolenVehicleService.getAllStolenVehicles();
	}

	// get all missing mobile record
	@GetMapping("/getmissingmobilerecord")
	public List<MissingMobile> fetchAllMissingMobile() {
		System.out.println("in fetch all Missing mobile ");
		return missingMobileService.getAllMissingMobile();
	}

	// get all missing people record
	@GetMapping("/getmissingpeoplerecord")
	public List<MissingPerson> fetchAllMissingPeople() {
		System.out.println("in fetch all Missing mobile ");
		return missingPersonService.getAllMissingPeople();
	}

	// get all complaints
	@GetMapping("/getallcomplaints")
	public List<Complaint> fetchAllComplaints() {
		System.out.println("in fetch all complaints ");
		return complaintService.fetchAllComplaints();
	}

	@GetMapping("/complaint/details/{complaintId}")
	public ResponseEntity<?> getComplaintDetails(@PathVariable long complaintId) {
		try {
			System.out.println("in get Complaint Details for particular complaintId" + complaintId);
			return new ResponseEntity<>(complaintService.getDetailsOfComplaintByComplaintId(complaintId),
					HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("error while retrieving complaint " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	//complaint stats
		@GetMapping("/complaintstat")
		public ResponseEntity<?>  getComplaintStatistics(){
			return new ResponseEntity<>(complaintService.getComplaintStat(),HttpStatus.OK);
		}

}
