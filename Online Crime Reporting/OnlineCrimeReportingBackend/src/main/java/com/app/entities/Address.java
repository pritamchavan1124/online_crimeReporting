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
@Table(name = "addresses")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Address extends BaseEntity {
	@Column(length = 30, nullable = false)
	private String region;
	@Column(name = "pin", nullable = false)
	private Integer pinCode;
}
