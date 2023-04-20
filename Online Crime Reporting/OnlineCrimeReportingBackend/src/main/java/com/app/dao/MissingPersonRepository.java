package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.MissingPerson;

public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
	//add a method to find a MissingPerson complaint by ComplaintId
		@Query("select mp from MissingPerson mp join mp.regComplaint rc where rc.id=?1")
		MissingPerson findMissingPersonComplaintByComplaintId(long complaintId);
			
}
