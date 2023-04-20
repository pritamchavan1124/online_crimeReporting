package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.EmergencyComplaintType;

public interface EmergencyComplaintTypeRepository extends JpaRepository<EmergencyComplaintType, Long> {

}
