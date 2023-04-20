package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.PoliceRepository;
import com.app.dao.PoliceStationRepository;
import com.app.dto.PoliceDTO;
import com.app.entities.Police;
import com.app.entities.PoliceStation;

@Service
@Transactional
public class PoliceServiceImpl implements IPoliceService {
	
	// dep : dao layer i/f
		@Autowired
		private PoliceRepository policeRepo;
		
		//dep : model mapper bean : used for mapping between : Entity n DTO
		@Autowired
		private ModelMapper mapper;
		
		@Autowired
		private PoliceStationRepository policeStationRepo;
		
		@Autowired
		private AddressRepository addressRepo;
		
		@Override
		public List<Police> getAllPolice() {
			// TODO Auto-generated method stub
			return policeRepo.findAll();
		}


		@Override
		public Police addPolice(PoliceDTO transientPolice) {
			Police police = mapper.map(transientPolice,Police.class);
			police.setAddress(addressRepo.findById(transientPolice.getAddressId()).orElseThrow(()->new ResourceNotFoundException("Address record not found")));
			police.setPoliceStation(policeStationRepo.findById(transientPolice.getPoliceStationId()).orElseThrow(()->new ResourceNotFoundException("Police Station record not found")));
			return policeRepo.save(police);
			
		}


		@Override
		public String deletePoliceById(long pId) {
			String mesg = "Deleting police failed !!!!!";
			// if you want to confirm the id :
			if (policeRepo.existsById(pId)) {
				policeRepo.deleteById(pId);
				mesg = "Deleted police of id " + pId;
			}
			return mesg;
		}

		@Override

		public Police getPoliceDetails(long pId) {
			
			return policeRepo.findById(pId).orElseThrow(() -> new ResourceNotFoundException("Invalid Police Id"));
		}
		


		@Override
		public Police updatePolice(PoliceDTO detachedPolice) {
			Police policeToUpdate = policeRepo.findById(detachedPolice.getId()).get();//orElseThrow(() -> new ResourceNotFoundException("Invalid Police ID!!!!!! : Can't Update details"));
			//=> valid police id
			Police updatedPolice =mapper.map(policeToUpdate,Police.class);
			if(policeToUpdate!=null)
			{
				
				policeToUpdate.setPmobileNo(detachedPolice.getPmobileNo());
				policeToUpdate.setAddressLine(detachedPolice.getAddressLine());
				policeToUpdate.setAddress(addressRepo.findById(detachedPolice.getAddressId()).orElseThrow(()->new ResourceNotFoundException("Address record not found")));
				
				updatedPolice = policeRepo.save(policeToUpdate);//update
			}
			
			
			return updatedPolice;

		}


		@Override
		public List<Police> getPoliceDetailsByPolicestation(long psId) {
			
			List<Police> policeList = policeRepo.getPoliceByPoliceStationId(psId);
			return policeList;
		}

}
