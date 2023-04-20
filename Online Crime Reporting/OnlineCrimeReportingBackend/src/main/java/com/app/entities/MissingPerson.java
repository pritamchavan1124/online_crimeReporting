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
@Table(name = "missing_people")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude ="regComplaint")
public class MissingPerson extends BaseEntity {
	@Column(length = 50, nullable = false)
	private String name;
	@Column(nullable = false)
	private int age;
	@Column(length = 15, nullable = false)
	private String gender;
	@Column
	private double height;

	//@JsonIgnoreProperties({"reportingDate","description","crimeDate","crimeTime","victimName","suspect","location","mobileNo","complaintStatus","relationWithVictim","complainant","caseType","policeStation"})
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "complaint_id", nullable = false)
	private Complaint regComplaint;

	//DONOT Uncomment The following Code
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "case_type_id", nullable = false)
//	private CaseType caseType;
}
