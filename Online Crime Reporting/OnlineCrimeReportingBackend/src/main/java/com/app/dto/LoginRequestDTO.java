package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequestDTO {
	@NotBlank(message = "Email must be supplied ...")
	//@Pattern(regexp = "^[_A-Za-z0-9-+]+ (.[_A-Za-z0-9-]+)*@"
//			+ "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$", message = "Invalid Email Format")
	private String email;
	
	
	@NotBlank(message = "Password must include one special character and number")
	// @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message =
	// "Blank or invalid password")
	private String password;

}
