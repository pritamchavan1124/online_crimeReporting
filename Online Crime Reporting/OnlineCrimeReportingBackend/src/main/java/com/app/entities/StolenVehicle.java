package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "stolen_vehicles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude ="regComplaint")
public class StolenVehicle extends BaseEntity {
	@Column(length = 50, nullable = false)
	private String regNo;
	@Column(length = 30, nullable = false)
	private String companyName;
	@Column(length = 20, nullable = false)
	private String chassisNo;
	@Column(length = 30, nullable = false)
	private String modelName;
	@Enumerated(EnumType.STRING)
	@Column(length = 25)
	private VehicleType vehicleType;
	
	//@JsonIgnoreProperties({"reportingDate","description","crimeDate","crimeTime","victimName","suspect","location","mobileNo","complaintStatus","relationWithVictim","complainant","caseType","policeStation"})
	@OneToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "complaint_id", nullable = false)
	private Complaint regComplaint;

//	@ManyToOne(fetch = FetchType.LAZY)//Not recommnded since causing repetitive data in this Column
//	@JoinColumn(name = "case_type_id", nullable = false)
//	private CaseType caseType;
}
