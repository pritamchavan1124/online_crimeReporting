package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SecurityQuestion;

public interface SecurityQuestionRepository extends JpaRepository<SecurityQuestion, Long> {

}
