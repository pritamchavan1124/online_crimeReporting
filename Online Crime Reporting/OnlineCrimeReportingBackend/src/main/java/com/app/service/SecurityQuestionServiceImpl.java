package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.SecurityQuestionRepository;
import com.app.entities.SecurityQuestion;

@Service
@Transactional
public class SecurityQuestionServiceImpl implements ISecurityQuestionService {

	@Autowired
	private SecurityQuestionRepository secQuestionRepo;
	
	@Override
	public List<SecurityQuestion> getAllSecQuestions() {
		
		return secQuestionRepo.findAll();
	}

}
