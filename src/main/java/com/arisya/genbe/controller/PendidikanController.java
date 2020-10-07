package com.arisya.genbe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arisya.genbe.model.dto.PendidikanDto;
import com.arisya.genbe.model.dto.StatusDto;
import com.arisya.genbe.model.entity.Pendidikan;
import com.arisya.genbe.repository.PendidikanRepository;
import com.arisya.genbe.service.PersonService;
import com.arisya.genbe.service.PersonServiceImpl;

@RestController
@RequestMapping("/pendidikan")
@CrossOrigin(origins="http://localhost:3000")
public class PendidikanController {

	private final PendidikanRepository pendidikanRepository;
	
	@Autowired
	private PersonService personService = new PersonServiceImpl();

	@Autowired
	public PendidikanController(PendidikanRepository pendidikanRepository) {
		this.pendidikanRepository = pendidikanRepository;
	}
	

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

	// http://localhost:8080/pendidikan/1
	@GetMapping("/{idPendidikan}")
	public PendidikanDto get(@PathVariable Integer idPendidikan){
		Pendidikan pendidikan = pendidikanRepository.findById(idPendidikan).get();
		PendidikanDto pendidikanDto = new PendidikanDto();
		pendidikanDto.setIdPerson(pendidikan.getPerson().getIdPerson());
		pendidikanDto.setJenjang(pendidikan.getJenjang());
		pendidikanDto.setInstitusi(pendidikan.getInstitusi());
		pendidikanDto.setMasuk(pendidikan.getThMasuk());
		pendidikanDto.setLulus(pendidikan.getThLulus());
		return pendidikanDto;
	}

}
