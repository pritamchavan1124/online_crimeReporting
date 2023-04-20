package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "police")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"address","policeStation"})
public class Police extends BaseEntity {
	@Column(length = 40,name="p_name",nullable = false)
	private String pname;
	@Column(name="p_age",nullable = false) 
	private int page;
	@Column(length = 10,name="p_mob",nullable = false)
	private String pmobileNo;
	@Column(length = 15,name="p_gen", nullable = false)
	private String pgender;	 
	@Column(length = 40,name="p_email", nullable = false, unique = true)
	private String pemail;
	@Column(name = "address_line",length = 100, nullable = false)
	private String addressLine;
	
	
	//@JsonIgnoreProperties({"region","pinCode"})
	//@JsonProperty
	@ManyToOne//(fetch = FetchType.LAZY)//Police*===>1Address
	@JoinColumn(name="address_id", nullable = false)
	private Address address;
	
	//@JsonIgnoreProperties({"name","mobileNo","email","password","confirmPassword","role","addressLine","address","division","securityQuestion","answer","dob","gender"})
	
	@ManyToOne//(fetch = FetchType.LAZY)//Police*===>1PoliceStation
	@JoinColumn(name="police_station_id", nullable = false)
	private PoliceStation policeStation;
}



