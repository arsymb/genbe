package com.arisya.genbe.service;

import java.util.List;

import com.arisya.genbe.model.dto.PendidikanDto;
import com.arisya.genbe.model.dto.PersonDto;
import com.arisya.genbe.model.dto.StatusDto;
import com.arisya.genbe.model.entity.Biodata;
import com.arisya.genbe.model.entity.Pendidikan;
import com.arisya.genbe.model.entity.Person;

public interface PersonService {
	StatusDto insertPerson(PersonDto personDto);
	Person convertToPersonEntity(PersonDto personDto);
	Biodata convertToBiodataEntity(PersonDto personDto, Integer idPerson);
	void insertPendidikan(Integer idPerson, List<PendidikanDto> pendidikanDto);
	Pendidikan convertToPendidikanEntity(PendidikanDto pendidikanDto, Integer idPerson);
}
