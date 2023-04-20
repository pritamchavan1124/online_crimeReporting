package com.app.custom_exception;

public class UserAlreadyExistException extends RuntimeException {
	public UserAlreadyExistException(String mseg) {
		super(mseg);
	}

}
