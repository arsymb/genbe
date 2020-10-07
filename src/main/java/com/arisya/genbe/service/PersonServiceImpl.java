package com.arisya.genbe.service;

import java.time.Year;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arisya.genbe.model.dto.PendidikanDto;
import com.arisya.genbe.model.dto.PersonDto;
import com.arisya.genbe.model.dto.StatusDto;
import com.arisya.genbe.model.entity.Biodata;
import com.arisya.genbe.model.entity.Pendidikan;
import com.arisya.genbe.model.entity.Person;
import com.arisya.genbe.repository.BiodataRepository;
import com.arisya.genbe.repository.PendidikanRepository;
import com.arisya.genbe.repository.PersonRepository;

@Service
@Transactional
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private BiodataRepository biodataRepository;

	@Autowired
	private PendidikanRepository pendidikanRepository;

	@Override
	public StatusDto insertPerson(PersonDto personDto) {
		List<Person> personList = personRepository.findAll();
		List<Boolean> nikCheck = personList.stream().map(x -> x.getNik().equals(personDto.getNik()))
				.collect(Collectors.toList());

		StatusDto statusDto = new StatusDto();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(personDto.getTgl());
		if (Year.now().getValue() - calendar.get(Calendar.YEAR) < 30 && personDto.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage(
					"data gagal masuk, umur kurang dari 30 tahun dan jumlah digit nik tidak sama dengan 16");
		} else if (Year.now().getValue() - calendar.get(Calendar.YEAR) < 30) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, umur kurang dari 30 tahun");
		} else if (personDto.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage("jumlah digit nik tidak sama dengan 16");
		} else if (nikCheck.contains(true)) {
			statusDto.setStatus("false");
			statusDto.setMessage("data dengan nik " + personDto.getNik() + " sudah ada");
		} else {
			Person person = convertToPersonEntity(personDto);
			personRepository.save(person);
			Biodata biodata = convertToBiodataEntity(personDto, person.getIdPerson());
			biodataRepository.save(biodata);
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil masuk");
		}
		return statusDto;
	}

	public Person convertToPersonEntity(PersonDto personDto) {
		Person person = new Person();
		person.setIdPerson(personDto.getIdPerson());
		person.setNik(personDto.getNik());
		person.setNama(personDto.getName());
		person.setAlamat(personDto.getAddress());
		return person;
	}

	public Biodata convertToBiodataEntity(PersonDto personDto, Integer idPerson) {
		Biodata biodata = new Biodata();
		biodata.setIdBio(personDto.getId());
		biodata.setNoHp(personDto.getHp());
		biodata.setTglLahir(personDto.getTgl());
		biodata.setTmptLahir(personDto.getTempatLahir());
		if (personRepository.findById(idPerson).isPresent()) {
			Person person = personRepository.findById(idPerson).get();
			biodata.setPerson(person);
		}
		return biodata;
	}

	@Override
	public StatusDto updatePerson(PersonDto newPerson, Integer idPerson) {
		StatusDto statusDto = new StatusDto();
		Person person = personRepository.findById(idPerson).get();
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(person.getIdPerson());
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(newPerson.getTgl());
		if (Year.now().getValue() - calendar.get(Calendar.YEAR) < 30 && newPerson.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, umur kurang dari 30 tahun dan jumlah digit nik tidak sama dengan 16");
		} else if (Year.now().getValue() - calendar.get(Calendar.YEAR) < 30) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, umur kurang dari 30 tahun");
		} else if (newPerson.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage("jumlah digit nik tidak sama dengan 16");
		} else {
			person.setNik(newPerson.getNik());
			person.setNama(newPerson.getName());
			person.setAlamat(newPerson.getAddress());
			biodata.setNoHp(newPerson.getHp());
			biodata.setTglLahir(newPerson.getTgl());
			biodata.setTmptLahir(newPerson.getTempatLahir());
			personRepository.save(person);
			biodataRepository.save(biodata);
			if (person.getNik().equals(newPerson.getNik()) && person.getNama().equals(newPerson.getName())
				&& person.getAlamat().equals(newPerson.getAddress()) && biodata.getNoHp().equals(newPerson.getHp())
				&& biodata.getTglLahir().equals(newPerson.getTgl())
				&& biodata.getTmptLahir().equals(newPerson.getTempatLahir())) {
				statusDto.setStatus("true");
				statusDto.setMessage("perubahan data berhasil dilakukan");
			} else {
				statusDto.setStatus("false");
				statusDto.setMessage("perubahan data gagal");
			}
		}
		return statusDto;
	}

	@Override
	public void insertPendidikan(Integer idPerson, List<PendidikanDto> pendidikanDto) {
		if (personRepository.findById(idPerson).isPresent()) {
			List<Pendidikan> pendidikan = pendidikanDto.stream().map(x -> convertToPendidikanEntity(x, idPerson))
					.collect(Collectors.toList());
			for (int i = 0; i < pendidikan.size(); i++) {
				if (pendidikan.get(i).getJenjang() == "Pilih..." || pendidikan.get(i).getInstitusi() == ""
						|| pendidikan.get(i).getThLulus() == "" || pendidikan.get(i).getThMasuk() == "") {
					Integer.parseInt("error");
				} else {
					pendidikanRepository.save(pendidikan.get(i));
				}

			}

		}
	}

	public Pendidikan convertToPendidikanEntity(PendidikanDto pendidikanDto, Integer idPerson) {
		Pendidikan pendidikan = new Pendidikan();
		pendidikan.setJenjang(pendidikanDto.getJenjang());
		pendidikan.setInstitusi(pendidikanDto.getInstitusi());
		pendidikan.setThMasuk(pendidikanDto.getMasuk());
		pendidikan.setThLulus(pendidikanDto.getLulus());
		if (personRepository.findById(idPerson).isPresent()) {
			Person person = personRepository.findById(idPerson).get();
			pendidikan.setPerson(person);
		}
		return pendidikan;
	}

	@Override
	public StatusDto deleteData(Integer idPerson){
		StatusDto statusDto = new StatusDto();
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(idPerson);
		biodataRepository.deleteById(biodata.getIdBio());
		List<Pendidikan> pendidikan = pendidikanRepository.findAllByPersonIdPerson(idPerson);
		for (int i = 0; i < pendidikan.size(); i++) {
			pendidikanRepository.deleteById(pendidikan.get(i).getIdPendidikan());
		}
		personRepository.deleteById(idPerson);
		if(personRepository.findById(idPerson).isPresent() == false && biodataRepository.findAllByPersonIdPerson(idPerson) == null 
			&& pendidikanRepository.findAllByPersonIdPerson(idPerson).isEmpty()){
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil dihapus");
		} else {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal dihapus");
		}
		return statusDto;
	}
	
}
