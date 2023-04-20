package com.app.dto;



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
public class ComplaintStatusDTO {

	private long id;
	
	private String complaintStatus;
}
