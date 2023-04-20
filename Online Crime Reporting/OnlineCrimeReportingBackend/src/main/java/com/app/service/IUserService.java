package com.app.service;


import com.app.dto.ApiResponse;
import com.app.dto.LoginRequestDTO;
import com.app.dto.UserDTO;

import com.app.entities.User;

public interface IUserService {
	
	   //authenticate method 
	UserDTO authenticateUser(LoginRequestDTO request);
	  
	//  register new user 
	//User registerNewUser(UserDTO userdto);
	  
	//new reg method for new user
	ApiResponse registerUser(UserDTO userdto);
	  // add a method to get UserDetails(For MyProfile) by userID
	User getUserDetails(long userId);
	
	//add a method to update mobile no or address of User
	User updateUser(UserDTO userdto);
	
	//add a method to reset password
	User resetPasswordForUser(UserDTO userdto);
	
}
