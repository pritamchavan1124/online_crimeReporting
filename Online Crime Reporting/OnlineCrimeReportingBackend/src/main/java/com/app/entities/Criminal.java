package com.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "criminals")
@Setter
@Getter
@ToString(exclude = { "caseTypeSelected", "address" })
@NoArgsConstructor
@AllArgsConstructor

public class Criminal extends BaseEntity {
	@Column(length = 30, name = "cr_name", nullable = false)
	private String crName;
	@Column(name = "cr_age", nullable = false)
	private Integer crAge;
	@Column(length = 15, name = "cr_gen", nullable = false)
	private String crGender;

	// Many to One rel between criminal and case type
	@ManyToMany(fetch = FetchType.EAGER)//*Criminals===>*CaseTypes
	@JoinTable(name = "criminal_case_type",joinColumns=@JoinColumn(name="cr_id"),inverseJoinColumns=@JoinColumn(name="ct_id"))
	private Set<CaseType> caseTypeSelected=new HashSet<>();

	// Many to One rel between criminal and address
	//@JsonIgnoreProperties({"region","pinCode"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "ad_id", nullable = false)
	private Address address;

}
