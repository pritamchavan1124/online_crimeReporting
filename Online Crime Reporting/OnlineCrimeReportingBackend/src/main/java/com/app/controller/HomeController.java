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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthResp;
import com.app.dto.EmergencyComplaintDTO;
import com.app.dto.LoginRequestDTO;
import com.app.dto.UserDTO;
import com.app.entities.CaseType;
import com.app.entities.EmergencyComplaint;
import com.app.entities.EmergencyComplaintType;
import com.app.entities.PoliceStation;
import com.app.jwt_utils.JwtUtils;
import com.app.service.CustomUserDetails;
import com.app.service.IAddressService;
import com.app.service.IComplaintService;
import com.app.service.IDivisionService;
import com.app.service.IEmergencyComplaintService;
import com.app.service.IEmergencyComplaintTypeService;
import com.app.service.ISecurityQuestionService;
import com.app.service.IUserService;

@RestController // =@Controller + @ResponseBody
@RequestMapping("/api/home") // resource : class level pattern
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@Validated // added for enabling validation support for req params n path vars
public class HomeController {
	
	@Autowired
	private IEmergencyComplaintService emergencyComplaintService;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private IUserService userService;
	@Autowired
	private IAddressService addressService;
	@Autowired
	private IDivisionService divisionService;
	@Autowired
	private ISecurityQuestionService securityQuestionService;
	@Autowired
	private IEmergencyComplaintTypeService ecTypeService;
	@Autowired
	private IComplaintService complaintService;
	
	@Autowired
	private JwtUtils utils;
	
	public HomeController() {
		super();
		System.out.println("in ctor of  Home controller");
	}

	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid LoginRequestDTO request)
	{
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken	
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
		System.out.println("auth token before {}"+authToken);
	try {
		// authenticate the credentials
		Authentication authenticatedDetails = manager.authenticate(authToken);
		System.out.println("auth token again {} "+authenticatedDetails);
		CustomUserDetails userDetails=(CustomUserDetails)authenticatedDetails.getPrincipal();
		// => auth succcess
	return ResponseEntity.ok(new AuthResp("Authentication successfull!",utils.generateJwtToken(authenticatedDetails),userDetails.getUser().getRole(),userDetails.getUser().getId()));
	}catch(BadCredentialsException e) {
		// send back err resp code
		System.out.println("err "+e);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
	
	}
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerNewUser(@RequestBody @Valid UserDTO user) {
		try {
			System.out.println("in register new user " + user.getName());
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));

		} catch (RuntimeException e) {
			System.out.println("error while registering new user " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));

		}

	}
	// add new emergency complaint
	@PostMapping("/emergencycomplaint/add")
	public EmergencyComplaint addEmergencyComplaint(@RequestBody EmergencyComplaintDTO emergencyComplaint) {
		System.out.println("in update  emergency complaint  dtls" + emergencyComplaint);// not null id
		return emergencyComplaintService.addEmergencyComplaint(emergencyComplaint) ;
	}
	
	//view EC by ID
	@GetMapping("/emergencycomplaint/{ecId}")
	public ResponseEntity<?> getEmergencyComplaintDetails(@PathVariable long ecId) {
		System.out.println("in get emergencycomplaint details by ecId");
		try {
			// o.s.http.ResponseEntity(T body,HttpStatus stsCode)
			return new ResponseEntity<>(emergencyComplaintService.getEmergencyComplaintById(ecId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in Home controller " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	//get all addresses for Complainant/ADMIN signup purpose
	@GetMapping("/addresses")
	public ResponseEntity<?> getAddressList()
	{
		return new ResponseEntity<>(addressService.getAllAddresses(),HttpStatus.OK);
	}
	//get all divisions for POLICESTATION signup purpose
	@GetMapping("/divisions")
	public ResponseEntity<?> getDivisionList()
	{
		return new ResponseEntity<>(divisionService.getAllDivisions(),HttpStatus.OK);
	}

	@GetMapping("/policestation/getpolicestations")
	public List<PoliceStation> fetchAllPoliceStation() {
		System.out.println("in fetch all ");
		return complaintService.getAllPoliceStation();
	}
	
	@GetMapping("/securityquestions")
	public ResponseEntity<?> getSecQuestionList()
	{
		return new ResponseEntity<>(securityQuestionService.getAllSecQuestions(),HttpStatus.OK);
	}
	@PutMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@RequestBody UserDTO user) {
		
		try 
		{
			System.out.println("in update user "+user);
			 
			return new ResponseEntity<>(userService.resetPasswordForUser(user),HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()),HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/ecasetype/getecasetypes")
	public List<EmergencyComplaintType> fetchAllEcCaseTypes() {
		System.out.println("in fetch all case types");
		return ecTypeService.getAllEmergencyComplaintType();

	}
}
