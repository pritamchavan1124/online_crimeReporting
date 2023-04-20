package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.MissingMobileRepository;
import com.app.entities.MissingMobile;

@Service
@Transactional
public class MissingMobileServiceImpl implements IMissingMobileService {

	@Autowired
	private MissingMobileRepository mmRepo;
	
	@Override
	public List<MissingMobile> getAllMissingMobile() {
		System.out.println("in service "+mmRepo.findAll());
		
		return mmRepo.findAll();
	}

}
