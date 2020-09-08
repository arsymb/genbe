package com.arisya.genbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arisya.genbe.model.entity.Biodata;

@Repository
public interface BiodataRepository extends JpaRepository<Biodata, Integer> {

	Biodata findAllByPersonIdPerson(Integer idPerson);
	
}
