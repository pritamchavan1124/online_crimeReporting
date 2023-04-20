package com.app.responsedto;

import com.app.entities.Address;
import com.app.entities.PoliceStation;
import com.app.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor//ONLY FOR TESTING PURPOSE
@AllArgsConstructor//ONLY FOR TESTING PURPOSE
@Getter
@Setter
@ToString

public class PoliceStationRespDTO {
	
	private Long id;
	private String email;

	private String password;

	
	private String name;// user name

	private String mobileNo;
	
	
	private Role role;

	private String addressLine;
	
	private Address address;
	
	private String divName;

}
