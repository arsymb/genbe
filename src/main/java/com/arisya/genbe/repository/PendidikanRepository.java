package com.arisya.genbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.arisya.genbe.model.entity.Pendidikan;

@Repository
public interface PendidikanRepository extends JpaRepository<Pendidikan, Integer>{
	
	List<Pendidikan> findAllByPersonIdPerson(Integer idPerson);

	void deleteAllByPersonIdPerson(Integer idPerson); 
	
	@Query(value = "SELECT jenjang FROM t_pendidikan WHERE idperson = ?1 ORDER BY tahunlulus DESC LIMIT 1", nativeQuery = true)
	String lastJenjang(Integer idPerson);
	
}
