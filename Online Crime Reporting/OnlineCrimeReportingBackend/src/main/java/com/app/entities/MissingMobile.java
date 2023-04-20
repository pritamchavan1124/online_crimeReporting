package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "missing_mobiles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "regComplaint")
public class MissingMobile extends BaseEntity {
	@Column(length = 15,name="mm_imei", nullable = false)
	private String imei;
	@Column(length = 30,name="mm_com", nullable = false)
	private String company;
	@Column(length = 30,name="mm_model", nullable = false)
	private String model;
	@Column(length = 15, name = "mm_sim", nullable = false)
	private String simCardCompanyName;
	@Column(length = 10,name="mm_mob", nullable = false)
	private String mobileNoInMissingMobile;

	//@JsonIgnoreProperties({"reportingDate","description","crimeDate","crimeTime","victimName","suspect","location","mobileNo","complaintStatus","relationWithVictim","complainant","caseTypeSelected","policeStation"})
	@OneToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "complaint_id", nullable = false)
	private Complaint regComplaint;

	//DONOT Uncomment The following Code
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "case_type_id", nullable = false)
//	private CaseType caseType;
}


