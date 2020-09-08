package com.arisya.genbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arisya.genbe.model.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {

	List<Person> findByNik(String nik);
	
}
