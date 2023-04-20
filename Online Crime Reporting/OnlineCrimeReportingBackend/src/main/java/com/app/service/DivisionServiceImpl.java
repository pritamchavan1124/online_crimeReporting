package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.DivisionRepository;
import com.app.entities.Division;
@Service
@Transactional
public class DivisionServiceImpl implements IDivisionService {

	@Autowired
	private DivisionRepository divisionRepo;
	
	@Override
	public List<Division> getAllDivisions() {
		
		return divisionRepo.findAll();
	}

}
