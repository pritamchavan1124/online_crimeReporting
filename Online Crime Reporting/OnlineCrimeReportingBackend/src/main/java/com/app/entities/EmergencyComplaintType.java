package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "emergency_complaint_types")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyComplaintType extends BaseEntity {
	@Column(length = 100, name = "et_type", unique=true)
	private String ecType;

}
 