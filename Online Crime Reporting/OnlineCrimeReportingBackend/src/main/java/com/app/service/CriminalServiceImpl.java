package com.app.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.CaseTypeRepository;
import com.app.dao.CriminalRepository;
import com.app.dto.CriminalDTO;
import com.app.entities.CaseType;
import com.app.entities.Criminal;

@Service
@Transactional
public class CriminalServiceImpl implements ICriminalService {

	// dao layer dependency
	@Autowired
	private CriminalRepository criminalRepo;
	@Autowired
	private CaseTypeRepository caseTypeRepo;

	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	 private ModelMapper mapper;
	@Override
	public Criminal addCriminal(CriminalDTO criminalDTO) {
		//1.map dto to entity
		Criminal criminal = mapper.map(criminalDTO, Criminal.class);
		Set<CaseType> ids = caseTypeRepo.findAllById(criminalDTO.getCaseTypeSelected()).stream().collect(Collectors.toSet());
		criminal.setCaseTypeSelected(ids);
		criminal.setAddress(addressRepo.findById(criminalDTO.getAddressId()).orElseThrow(()-> new ResourceNotFoundException("No corresponding address found")));
		return criminalRepo.save(criminal);
	}

	@Override
	public Criminal getCriminalById(long crId) {

		return criminalRepo.findById(crId)//findBycrName(crId)
				.orElseThrow(() -> new ResourceNotFoundException("Criminal doesn't exist in record"));
	}

	@Override
	public List<Criminal> getAllCriminal() {

		return criminalRepo.findAll();
	}

	@Override
	public String deleteCriminalById(long cr_id) {
		String message = "Deletion of Criminal failed..";
		if(criminalRepo.existsById(cr_id)) {
			criminalRepo.deleteById(cr_id);
		 message = "Deletion of Criminal with Id "  +cr_id + " is Successful";
		}
		return message;
	}

}
