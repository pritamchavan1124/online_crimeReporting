package com.app.entities;


import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "complaints")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"caseTypeSelected","policeStation","complainant"})
public class Complaint extends BaseEntity {

	@Column(nullable = false)
	private LocalDate reportingDate;
	@Column(length = 200)
	private String description;
	@Column(nullable = false)
	private LocalDate crimeDate;
	@Column // optional field/attribute
	private LocalTime crimeTime;
	@Column(length = 30, nullable = false)
	private String victimName;
	@Column(length = 30)
	private String suspect;
	@Column(length = 30, nullable = false)
	private String location;
	@Column(length = 10, nullable = false)
	private String mobileNo;

	//Status of Complaint pending/inprocess/resolved
	@Enumerated(EnumType.STRING)
	@Column(length = 25)
	private StatusOfComplaint complaintStatus;
	
	
	//Relation with victim is Set of enum constants
	@Enumerated(EnumType.STRING)
	@Column(length = 25)
	private RelationWithVictim relationWithVictim;

	//TODO:Evidence file blob(do search about it)
	
	//@JsonIgnoreProperties({"email","password","confirmPassword","name","mobileNo","dob","gender","answer","role","address","addressLine","securityQuestion"})
	@ManyToOne//(fetch = FetchType.LAZY)//*Complaints===>1USer
	@JoinColumn(name = "user_id", nullable = false)
	private User complainant;

	//@JsonIgnoreProperties({"caseType"})
	@ManyToOne//CaseType ..caseId..(@ManyToOne) (child)Complaint*===>1CaseType(Parent)
	@JoinColumn(name = "case_type_id", nullable = false) // No null entries allowed so as to avoid orphan records
	private CaseType caseTypeSelected;
	
	//Police Station as a PoliceStaion id or FK ref. Complaints*===>1PoliceStation
	//@JsonIgnoreProperties({"name","mobileNo","email","password","confirmPassword","role","addressLine","address","division","securityQuestion","answer","dob","gender"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "police_station_id", nullable = false)
	private PoliceStation policeStation;
}
