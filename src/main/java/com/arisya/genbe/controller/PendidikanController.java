package com.arisya.genbe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arisya.genbe.model.dto.PendidikanDto;
import com.arisya.genbe.model.dto.StatusDto;
import com.arisya.genbe.service.PersonService;
import com.arisya.genbe.service.PersonServiceImpl;

@RestController
@RequestMapping("/pendidikan")
public class PendidikanController {

	@Autowired
	private PersonService personService = new PersonServiceImpl();

	// http://localhost:8080/pendidikan/person/1
	/* Insert Data Pendidikan */
	@PostMapping("/person/{idPerson}")
	public StatusDto insertPendidikan(@PathVariable Integer idPerson, @RequestBody List<PendidikanDto> pendidikanDto) {
		StatusDto statusDto = new StatusDto();
		try {
			personService.insertPendidikan(idPerson, pendidikanDto);
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil masuk");
		} catch (Exception e) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk");
		}
		return statusDto;
	}

}
