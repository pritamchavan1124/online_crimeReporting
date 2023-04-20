package com.app.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = {"address","securityQuestion","complaints"})
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	@Column(name = "u_email",length = 40, nullable = false, unique = true)
	private String email;
	@Column(name = "u_password",length = 100, nullable = false)
	private String password;
	@Transient
	private String confirmPassword;
	@Column(name = "u_name",length = 50, nullable = false)
	private String name;
	@Column(name = "u_mobileNo",length = 10, nullable = false)
	private String mobileNo;
	@Column
	private LocalDate dob;
	@Column(name = "u_gen",length = 15)
	private String gender;
	@Column(nullable = false)
	private String answer;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	@Column(name = "address_line",length = 100, nullable = false)
	private String addressLine;
	
	// many to one rel between user and address
	//@JsonIgnoreProperties({"region","pinCode"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "ad_id", nullable = false)
	private Address address;

	// many to one rel between user and sec que
	//@JsonIgnoreProperties({"securityQuestion"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "sec_id", nullable = false)
	private SecurityQuestion securityQuestion;
	
	//Bidirectional relation between User and complaints(1User===>*Complaints)
	@JsonIgnore
	@OneToMany(mappedBy = "complainant",orphanRemoval = true )// Initilaly we thought, orphanRemoval = true is not preferred here as even if we delete the relationship between User & one of its complaint, the corresponding Complaint in Complaints table should still exists though as a orphan Since it will be further helpful for drawing statistics of resolved complaints
	private List<Complaint> complaints;	//orphanRemoval = true we will now keep it as now we wish to delete the orphan records when User/Complainant Withdraws his/her complaint and PoliceStation will only mark Resolved and not delete it.
}
