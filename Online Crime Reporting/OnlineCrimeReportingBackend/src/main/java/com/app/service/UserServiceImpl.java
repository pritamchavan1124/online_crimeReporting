package com.app.service;



import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.custom_exception.UserAlreadyExistException;
import com.app.dao.AddressRepository;
import com.app.dao.SecurityQuestionRepository;
import com.app.dao.UserRepository;
import com.app.dto.ApiResponse;
import com.app.dto.LoginRequestDTO;
import com.app.dto.UserDTO;
import com.app.entities.Police;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	// dependency -> dao layer i/f
	@Autowired
	private UserRepository userRepo;

	// dep. -> model mapper bean : used for mapping between Entity n DTO
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private SecurityQuestionRepository secqRepo;
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public UserDTO authenticateUser(LoginRequestDTO request) {
		// invoke dao's method for authenticate
		User userEntity = userRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
		 //map : User entity --> User dto
		return mapper.map(userEntity, UserDTO.class);
	}

	
//	  @Override 
//	  public User registerNewUser(UserDTO userdto) throws UserAlreadyExistException 
//	  { if (emailExists(userdto.getEmail())) 
//	  { 
//		  throw new UserAlreadyExistException("There already has an account with that email: " + userdto.getEmail()); }
//	  
//	  User user = new User(); 
//	  user.setEmail(userdto.getEmail());
//	  user.setPassword(userdto.getPassword()); 
//	  user.setName(userdto.getName());
//	  user.setRole(userdto.getRole());// how to add enum
//	  user.setAnswer(userdto.getAnswer()); 
//	  user.setDob(userdto.getDob());
//	  user.setAddress(userdto.getAddress()); 
//	  user.setGender(userdto.getGender());
//	  user.setMobileNo(userdto.getMobileNo());
//	  user.setConfirmPassword(userdto.getConfirmPassword());
//	  user.setSecurityQuestion(userdto.getSecurityQuestion());
//	  
//	  return userRepo.save(user); }
	 

	
	  private boolean emailExists(String email) 
	  {		Optional<User> user = userRepo.findByEmail(email);
	  		System.out.println("     >>     "+user);
	  		if(user.isEmpty())
	  			return false;
		  return true; 
	  }


	@Override
	public User getUserDetails(long userId) {
		User validUser = userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Invalid UserID, no corresponding profile found!"));
		return validUser;
	}


	@Override
	public ApiResponse registerUser(UserDTO userdto) {
		if (emailExists(userdto.getEmail())) 
		{throw new UserAlreadyExistException("There already has an account with that email: " + userdto.getEmail()); 
		}
		User user = mapper.map(userdto,User.class);
		user.setRole(userdto.getRole());//might be this is optional
		user.setPassword(encoder.encode(userdto.getPassword()));
		user.setAddress(addressRepo.findById(userdto.getAddressId()).orElseThrow(()->new ResourceNotFoundException("No such corresponding address in the record")));
		user.setSecurityQuestion(secqRepo.findById(userdto.getSecurityQuestionId()).orElseThrow(()->new ResourceNotFoundException("No such corresponding security question in the record")));
		
		User persistentUser = userRepo.save(user);
		return new ApiResponse("User registered Succesfully with ID: "+persistentUser.getId());
	}
	
	@Override
	public User updateUser(UserDTO userdto) {
		User userToUpdate = userRepo.findById(userdto.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!!! : Can't Update details"));
		User userUpdated=null;
		if(userToUpdate!=null) {
			userToUpdate.setMobileNo(userdto.getMobileNo());
			userToUpdate.setAddressLine(userdto.getAddressLine());
			userToUpdate.setAddress(addressRepo.findById(userdto.getAddressId()).orElseThrow(()-> new ResourceNotFoundException("Address record not found")));
			userUpdated=userRepo.save(userToUpdate);
		}
		return userUpdated;
	}


	@Override
	public User resetPasswordForUser(UserDTO userdto) {
		User userToUpdate = userRepo.findByEmail(userdto.getEmail()).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!!! : Can't Update details"));
		User userUpdated = null;
	if(userToUpdate !=null) {
		Long secId = userToUpdate.getSecurityQuestion().getId();
		if(userdto.getSecurityQuestionId()!= secId) {
			throw new ResourceNotFoundException("Selected security question is not matched with the corresponding record ");
		} else {
			String answer = userToUpdate.getAnswer();
			userdto.getAnswer();
			if(!((userdto.getAnswer()).equalsIgnoreCase(answer))) {
				throw new ResourceNotFoundException("Given answer is not matched with the corresponding record ");
			} else {
					userToUpdate.setPassword(encoder.encode(userdto.getPassword()));
					userUpdated = userRepo.save(userToUpdate);
			}
		}
	}
		return userUpdated;
	}



	

}
