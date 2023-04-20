package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.entities.Address;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService{

	@Autowired
	private AddressRepository addressRepo;
	
	@Override
	public List<Address> getAllAddresses() {
		
		return addressRepo.findAll();
	}
	

}
