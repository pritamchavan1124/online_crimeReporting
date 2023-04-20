package com.app.dto;

import com.app.entities.TypeOfCase;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor//ONLY FOR TESTING PURPOSE

@Getter
@Setter
@ToString
public class ComplaintStatisticsDTO {
	
	private TypeOfCase caseType;
	
	private long noOfComplaints;
	
	public ComplaintStatisticsDTO(TypeOfCase caseType, long noOfComplaints) {
		super();
		this.caseType=caseType;
		this.noOfComplaints=noOfComplaints;
	}
	
	

}
