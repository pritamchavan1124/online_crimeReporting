package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CaseType;

public interface CaseTypeRepository extends JpaRepository<CaseType, Long> {

}
