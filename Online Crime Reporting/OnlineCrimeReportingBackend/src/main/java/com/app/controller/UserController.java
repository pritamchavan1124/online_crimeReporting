package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
import com.app.dto.AuthResp;
import com.app.dto.ComplaintDTO;
import com.app.dto.LoginRequestDTO;
import com.app.dto.PoliceDTO;
import com.app.dto.UserDTO;
import com.app.entities.CaseType;
import com.app.entities.Complaint;
import com.app.entities.Police;
import com.app.entities.PoliceStation;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IComplaintService;
import com.app.service.IPoliceStationService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api/user") // resource: class level pattern//Here change made for api/users to api/user
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@Validated // added for enabling validation support for req params n path vars
public class UserController {

	//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;
	// dep : service layer i/f
	@Autowired
	private IUserService userService;
	
	//dep: IComplaintService  
	@Autowired
	private IComplaintService complaintService;
	
	

	public UserController() {
		System.out.println("In ctr of UserController ");
	}
	
	
	// add req handling (REST API endpoint) to authenticate(signin) user
//	@PostMapping("/signin")
//	public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequestDTO request) {
//		System.out.println("in authenticate user " + request); ////
//		return ResponseEntity.ok().body(userService.authenticateUser(request));
//	}
	
	
	@GetMapping("/myprofile/{userId}")
	public ResponseEntity<?> viewMyProfile(@PathVariable long userId) {
		try {
			System.out.println("in view my profile " + userId);
			return new ResponseEntity<>(userService.getUserDetails(userId),HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("error while registering new user " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
		}
	}
		
	@PostMapping("/complaint/add")
	public Complaint addNewComplaint(@RequestBody ComplaintDTO requestObject) //Do we need to add @Valid annotation for ComplaintDTO????
	{
		System.out.println("in addComplaint "+requestObject);
		return complaintService.addEntireComplaint(requestObject);
	}
	
	@DeleteMapping("/complaint/{complaintId}")
	public ResponseEntity<?> deleteComplaint(@PathVariable long complaintId){
		try {
		System.out.println("in deleteComplaint "+complaintId);
		return new ResponseEntity<>(complaintService.deleteEntireComplaint(complaintId), HttpStatus.OK);
		}
		catch(RuntimeException e) {
			System.out.println("error while deleting complaint " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/complaint/{userId}")
	public ResponseEntity<?> getAllComplaints(@PathVariable long userId){
		try {System.out.println("in get all Complaints for particular user "+userId);
			return new ResponseEntity<>(complaintService.getAllComplaints(userId), HttpStatus.OK);
		}
		catch(RuntimeException e) {
			System.out.println("error while deleting complaint " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
//	/*TODO:This following api needs to be moved to PoliceStationController and not a part of UserController*/
//	@GetMapping("/complaintListForPS/{psId}")
//	public ResponseEntity<?> getAllComplaintsForSpecificPoliceStation(@PathVariable long psId){
//		try {System.out.println("in get all Complaints for particular Police Station "+psId);
//			return new ResponseEntity<>(complaintService.getAllComplaintsForPoliceStation(psId), HttpStatus.OK);
//		}
//		catch(RuntimeException e) {
//			System.out.println("error while deleting complaint " + e);
//			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
//		}
//	}
//	@GetMapping("/complaint/details/{complaintId}")
//	public ResponseEntity<?> getStolenVehicleComplaint(@PathVariable long complaintId){
//		try {System.out.println("in get Stolen Vehicle Complaint for particular complaintId"+complaintId);
//		return new ResponseEntity<>(complaintService.getStolenVehicleComplaintByComplaintId(complaintId), HttpStatus.OK);
//	}catch(RuntimeException e) {
//		System.out.println("error while retrieving complaint " + e);
//		return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
//	}
//	}
	@GetMapping("/complaint/details/{complaintId}")
	public ResponseEntity<?> getComplaintDetails(@PathVariable long complaintId){
		try {System.out.println("in get Complaint Details for particular complaintId"+complaintId);
		return new ResponseEntity<>(complaintService.getDetailsOfComplaintByComplaintId(complaintId), HttpStatus.OK);
	}catch(RuntimeException e) {
		System.out.println("error while retrieving complaint " + e);
		return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
	}
	}
	@GetMapping("/policestation/getpolicestations")
	public List<PoliceStation> fetchAllPoliceStation() {
		System.out.println("in fetch all ");
		return complaintService.getAllPoliceStation();
	}
	@GetMapping("/casetype/getcasetypes")
	public List<CaseType> fetchAllCaseTypes() {
		System.out.println("in fetch all case types");
		return complaintService.getAllCaseType();

	}
	@PutMapping("/updateuser")
	public ResponseEntity<?> updatePolice(@RequestBody UserDTO user) {
		
		try 
		{
			System.out.println("in update user "+user);
			 
			return new ResponseEntity<>(userService.updateUser(user),HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
		}
		
	}
	@GetMapping("/complaintstat")
	public ResponseEntity<?>  getComplaintStatistics(){
		return new ResponseEntity<>(complaintService.getComplaintStat(),HttpStatus.OK);
	}
	
}
