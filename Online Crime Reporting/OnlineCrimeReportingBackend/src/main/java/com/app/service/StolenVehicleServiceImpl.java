package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.StolenVehicleRepository;
import com.app.entities.StolenVehicle;
@Service
@Transactional
public class StolenVehicleServiceImpl implements IStolenVehicleService {

	
	@Autowired
	private StolenVehicleRepository svRepo;
	@Override
	public List<StolenVehicle> getAllStolenVehicles() {
		
		return svRepo.findAll();
	}

}
