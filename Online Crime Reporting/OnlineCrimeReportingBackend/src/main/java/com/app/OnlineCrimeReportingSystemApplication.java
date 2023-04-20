package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.service.EmergencyComplaintTypeServiceImpl;
import com.app.service.IEmergencyComplaintTypeService;

@SpringBootApplication
public class OnlineCrimeReportingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineCrimeReportingSystemApplication.class, args);
	}
//Since, @SpringBootApplication contains @Configuration (a class that declares one or more bean methods triggering auto-configuration)
//So can directly add a method for Configuring additional spring bean(s)(whose life cycle is to me managed by SC)

	@Bean//Indicates that a method produces a bean to be managed by the Spring container
	public ModelMapper myMapper()
	{//To create a ModelMapper instance
		ModelMapper mapper=new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return mapper;		
	}
//	@Bean//Indicates that a method produces a bean to be managed by the Spring container
//	public IEmergencyComplaintTypeService IEmergencyComplaintTypeService()
//	{//To create a ModelMapper instance
//		IEmergencyComplaintTypeService eservice=new EmergencyComplaintTypeServiceImpl();
//		((ModelMapper) eservice).getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//		return eservice;		
//	}	
}
