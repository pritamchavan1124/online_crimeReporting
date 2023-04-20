package com.app.dto;

import java.util.ArrayList;
import java.util.List;

import com.app.entities.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Entity
//@Table(name = "criminals")
@Setter
@Getter
//@ToString(exclude = { "caseTypeSelected", "address" })
@NoArgsConstructor
@AllArgsConstructor

public class CriminalDTO  {
	//@Column(length = 30, name = "cr_name", nullable = false)
	private String crName;
	//@Column(name = "cr_age", nullable = false)
	private Integer crAge;
	//@Column(length = 15, name = "cr_gen", nullable = false)
	private String crGender;

	
	private List<Long> caseTypeSelected= new ArrayList<>();

	// Many to One rel between criminal and address
	
	private long addressId;

}
