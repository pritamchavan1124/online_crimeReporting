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
@Table(name = "security_questions")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SecurityQuestion extends BaseEntity {
	@Column(length = 100, name = "sec_que", nullable = false,unique=true)
	private String securityQuestion;

}
