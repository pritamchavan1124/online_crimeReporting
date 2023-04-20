package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.CaseType;
import com.app.entities.MissingMobile;
import com.app.entities.MissingPerson;
import com.app.entities.PoliceStation;
import com.app.entities.RelationWithVictim;
import com.app.entities.StatusOfComplaint;
import com.app.entities.StolenVehicle;
import com.app.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import lombok.ToString;

@NoArgsConstructor//ONLY FOR TESTING PURPOSE
@AllArgsConstructor//ONLY FOR TESTING PURPOSE
@Getter
@Setter
//@ToString
public class ComplaintDTO {
	@Future(message = "Reporting date can not be in future...")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate reportingDate;
	
	private String description;
	
	@NotBlank(message = "Date on which crime happened must be provided")
	@Future(message = "Crime date can not be in future...")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate crimeDate;
	
	private LocalTime crimeTime;
	
	private String victimName;
	
	private String suspect;
	
	private StatusOfComplaint complaintStatus;
	
	@NotBlank(message = "Location at which crime happened must be provided")
	private String location;
	
	@NotEmpty(message = "mobile number must be given")
	@Size(min = 10, max = 12, message = "mobile number must be 10 digit")
	private String mobileNo;
	
	@NotBlank(message = "Must choose one of the field")
	private RelationWithVictim relationWithVictim;
	
	private long complainantId;
	
	private long caseTypeSelected;
	
	private long policeStationId;
	
	//additional fields from different entity added here
	private StolenVehicle stolenVehicle;
	
	private MissingPerson missingBeing;
	
	private MissingMobile missingMobile;
	
}
