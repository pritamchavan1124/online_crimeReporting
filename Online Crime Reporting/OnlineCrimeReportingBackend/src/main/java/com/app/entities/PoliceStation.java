package com.app.entities;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@DiscriminatorValue(value = "Police Station")
@PrimaryKeyJoinColumn(name = "id")
@Table(name="police_stations")
@Getter
@Setter
@ToString
public class PoliceStation extends User {
	
	//@JsonIgnoreProperties({"divisionName"})
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name="division_id", nullable = false)
	private Division division;
	
//	//Bidirectional relationShip between Police station and Complaints(1PoliceStation===>*Complaints)
	@JsonIgnore
	@OneToMany(mappedBy = "policeStation")
	private List<Complaint> complaints;
		
}
	


