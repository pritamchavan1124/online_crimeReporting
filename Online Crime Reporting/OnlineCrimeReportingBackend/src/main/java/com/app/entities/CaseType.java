package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "case_types")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CaseType extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(length = 50, name = "ct_type",unique=true)
	private TypeOfCase caseType;
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((caseType == null) ? 0 : caseType.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CaseType other = (CaseType) obj;
		if (caseType != other.caseType)
			return false;
		return true;
	}
	
	
}
