package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.app.entities.Address;
import com.app.entities.CaseType;
import com.app.entities.MissingMobile;
import com.app.entities.MissingPerson;
import com.app.entities.PoliceStation;
import com.app.entities.RelationWithVictim;
import com.app.entities.StatusOfComplaint;
import com.app.entities.StolenVehicle;
import com.app.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
public class PoliceDTO {
	
	private long id;
	
	private String pname;
	
	private int page;
	
	private String pmobileNo;
	
	private String pgender;	 
	
	private String pemail;
	
	private String addressLine;
	
	private long addressId;

	private long policeStationId;
}
