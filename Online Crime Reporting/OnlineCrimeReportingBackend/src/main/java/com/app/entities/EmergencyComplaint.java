package com.app.entities;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "emergency_complaints")
@Getter
@Setter
@ToString(exclude = { "policeStation", "address", "ecType" })
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyComplaint extends BaseEntity {
	@Column(name = "ec_name", length = 30, nullable = false)
	private String ecName;
	@Column(name = "ec_mob", length = 10, nullable = false)
	private String ecMobile;
	@Column(name = "ec_loc", length = 40, nullable = false)
	private String ecLocation;
	private LocalTime ecTime;
	@Column(name = "ec_desc", length = 200)
	private String description;
	// additional properties to establish from EC to PS (many to one)

	//@JsonIgnoreProperties({"name","mobileNo","email","password","confirmPassword","role","addressLine","address","division","securityQuestion","answer","dob","gender"})
	
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "ps_id", nullable = false)
	private PoliceStation policeStation;

	// many To one relationship between EC and address
	//@JsonIgnoreProperties({"region","pinCode"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "ad_id", nullable = false)
	private Address address;

	// many To one relationship between EC and EC type
	//@JsonIgnoreProperties({"ecType"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "et_id", nullable = false)
	private EmergencyComplaintType ecType;

}
