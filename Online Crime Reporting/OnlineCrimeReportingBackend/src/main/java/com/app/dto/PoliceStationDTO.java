package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Address;
import com.app.entities.Division;
import com.app.entities.Role;
import com.app.entities.SecurityQuestion;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"uPassword","uConfirmPassword"})
public class PoliceStationDTO {
	private Long id;
	@NotBlank(message = "Email must be supplied ...")
	//@Pattern(regexp = "^[_A-Za-z0-9-+]+ (.[_A-Za-z0-9-]+)*@"
		//	+ "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$", message = "Invalid Email Format")
	private String email;

	@NotBlank(message = "Password must be entered ")
	//@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or invalid password")
	// password should be added during unmarshaling -> Json to java object
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	//@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or invalid password")
	@NotBlank(message = "Confirm Password")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String confirmPassword;

	@NotBlank(message = "Name must be supplied")
	//@Length(min = 5, max = 20, message = "Invalid length of chars for user name")//min length could be 2???eg.Om
	@Length( max = 20, message = "Invalid length of chars for user name")//min length could be 2???eg.Om
	
	private String name;// user name

	@NotEmpty(message = "mobile number must be given")
//	@Size(min = 10, max = 12, message = "mobile number must be 10 digit")
	@Size(max = 12, message = "mobile number must be 10 digit")
	private String mobileNo;
	
	//@NotBlank
	private Role role;

	//@NotBlank(message = "Answer must be selected")
	private String answer;
	//@NotBlank(message = "Address Line must be filled")
	private String addressLine;
	//@NotBlank(message = "Address must be supplied")
	private long addressId;
	//private Address address;
	
	private long divisionId;
	//@NotBlank(message = "One of the question must be selected")
	private long securityQuestionId;

}
