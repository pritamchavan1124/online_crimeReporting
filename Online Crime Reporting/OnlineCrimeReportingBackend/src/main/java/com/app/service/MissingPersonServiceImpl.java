package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.MissingPersonRepository;
import com.app.entities.MissingPerson;

@Service
@Transactional
public class MissingPersonServiceImpl implements IMissingPersonService {

	
	@Autowired
	private MissingPersonRepository mpRepo;
	@Override
	public List<MissingPerson> getAllMissingPeople() {
		
		return mpRepo.findAll();
	}
	

}
