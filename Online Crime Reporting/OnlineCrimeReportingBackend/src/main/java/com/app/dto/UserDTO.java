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
import com.app.entities.Role;
import com.app.entities.SecurityQuestion;
import com.app.entities.TypeOfCase;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor//ONLY FOR TESTING PURPOSE
@AllArgsConstructor//ONLY FOR TESTING PURPOSE
@Getter
@Setter
@ToString(exclude = {"password","confirmPassword"})
public class UserDTO {
	
	private Long id;
	
	@NotBlank(message = "Email must be supplied ...")
//	@Pattern(regexp = "^[_A-Za-z0-9-+]+ (.[_A-Za-z0-9-]+)*@"
//						+ "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$", message = "Invalid Email Format")
	private String email;

	@NotBlank(message = "Password must be entered ")
	//@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or invalid password")
	//password should be added during unmarshaling -> Json to java object
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	@NotBlank(message = "Confirm Password")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String confirmPassword;

	@NotBlank(message = "Name must be supplied")
	private String name;// user name

	@NotEmpty(message = "mobile number must be given")
	private String mobileNo;

	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

	@NotBlank(message = "must choose gender")
	private String gender;
	
	//@NotBlank
	private Role role;

	//@NotBlank(message = "Answer must be selected")
	private String answer;
	//@NotBlank(message = "Address Line must be filled")
	private String addressLine;
	//@NotBlank(message = "Address must be supplied")
	private long addressId;
	
	//@NotBlank(message = "One of the question must be selected")
	private long securityQuestionId;

}
