package com.app.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyComplaintDTO {
	private String ecName;
	private String ecMobile;
	private String ecLocation;
	private LocalTime ecTime;
	private String description;
	
	private long policeStationId;

	private long addressId;

	private long ecTypeId;

}
