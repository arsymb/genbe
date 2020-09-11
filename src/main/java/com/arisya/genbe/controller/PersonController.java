package com.arisya.genbe.controller;

import java.time.Year;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arisya.genbe.model.dto.FullDto;
import com.arisya.genbe.model.dto.PersonDto;
import com.arisya.genbe.model.dto.StatusDto;
import com.arisya.genbe.model.dto.StatusDto2;
import com.arisya.genbe.model.entity.Biodata;
import com.arisya.genbe.model.entity.Person;
import com.arisya.genbe.repository.BiodataRepository;
import com.arisya.genbe.repository.PendidikanRepository;
import com.arisya.genbe.repository.PersonRepository;
import com.arisya.genbe.service.PersonService;

@RestController
@RequestMapping("/person")
public class PersonController {

	private final PersonRepository personRepository;
	private final BiodataRepository biodataRepository;
	private final PendidikanRepository pendidikanRepository;
	
	@Autowired
	private PersonService personService;

	@Autowired
	public PersonController(PersonRepository personRepository, BiodataRepository biodataRepository,
			PendidikanRepository pendidikanRepository) {
		this.personRepository = personRepository;
		this.biodataRepository = biodataRepository;
		this.pendidikanRepository = pendidikanRepository;
	}

	// http://localhost:8080/person
	/* Insert Data Person */
	@PostMapping
	public StatusDto insert(@RequestBody PersonDto personDto) {
		return personService.insertPerson(personDto);
	}
	
	@GetMapping
	public List<PersonDto> getPerson(){
		List<Person> personList = personRepository.findAll();
		List<PersonDto> personDtoList = new ArrayList<>();
		for (Person p:personList) {
		      PersonDto personDto = new PersonDto();
		      Biodata biodata = biodataRepository.findAllByPersonIdPerson(p.getIdPerson());
		      personDto.setId(biodata.getIdBio());
		      personDto.setIdPerson(p.getIdPerson());
		      personDto.setNik(p.getNik());
		      personDto.setName(p.getNama());
		      personDto.setAddress(p.getAlamat());
		      personDto.setTgl(biodata.getTglLahir());
		      personDto.setTempatLahir(biodata.getTmptLahir());
		      personDto.setHp(biodata.getNoHp());
		      personDtoList.add(personDto);
		    }
		return personDtoList;
	}
	
	@GetMapping("/{id}")
    public PersonDto getPersonById(@PathVariable Integer id) {
		Person person = personRepository.findById(id).get();
		PersonDto personDto = new PersonDto();
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(person.getIdPerson());
		personDto.setId(biodata.getIdBio());
		personDto.setIdPerson(biodata.getPerson().getIdPerson());
		personDto.setNik(person.getNik());
		personDto.setName(person.getNama());
		personDto.setAddress(person.getAlamat());
		personDto.setTgl(biodata.getTglLahir());
		personDto.setTempatLahir(biodata.getTmptLahir());
		personDto.setHp(biodata.getNoHp());
		return personDto;
    }
	
	// http://localhost:8080/person/pendidikan/1212121212121212
	@GetMapping("/pendidikan/{nik}")
	public Object get(@PathVariable String nik) {
		List<Object> status = new ArrayList<>();
		StatusDto statusDto = new StatusDto();
		StatusDto2 statusDto2 = new StatusDto2();
		if (nik.length() == 16) {
			if(!(personRepository.findByNik(nik).isEmpty())) {
				FullDto fullDto = convertToDto(nik);
				statusDto2.setStatus("true");
				statusDto2.setMessage("success");
				statusDto2.setData(fullDto);
				status.add(statusDto2);
			} else {
				statusDto.setStatus("true");
				statusDto.setMessage("data dengan nik " + nik + " tidak ditemukan");
				status.add(statusDto);
			}
		} else {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, jumlah digit nik tidak sama dengan 16");
			status.add(statusDto);
		}
		return status.get(0);
	}
	
	@GetMapping("/pendidikan")
	public List<FullDto> get() {
		List<Biodata> biodataList = biodataRepository.findAll();
		List<FullDto> fullDto = biodataList.stream().map(x -> convertToDto(x.getPerson().getNik())).collect(Collectors.toList());
		return fullDto;
	}
	
	private FullDto convertToDto(String nik) {
		FullDto fullDto = new FullDto();
		Person person = personRepository.findByNik(nik).get(0);
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(person.getIdPerson());
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(biodata.getTglLahir());
		
		fullDto.setNik(biodata.getPerson().getNik());
		fullDto.setName(biodata.getPerson().getNama());
		fullDto.setAddress(biodata.getPerson().getAlamat());
		fullDto.setHp(biodata.getNoHp());
		fullDto.setTgl(biodata.getTglLahir());
		fullDto.setTempatLahir(biodata.getTmptLahir());
		fullDto.setUmur(Year.now().getValue() - calendar.get(Calendar.YEAR));
		fullDto.setPendidikan_terakhir(pendidikanRepository.lastJenjang(biodata.getPerson().getIdPerson()));
		return fullDto;
	}
	
}
