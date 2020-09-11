package com.arisya.genbe.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "t_biodata")
public class Biodata {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_bio")
	private Integer idBio;

	@Column(name = "nohp", length = 16)
	private String noHp;

	@Column(name = "tanggal_lahir", nullable = false)
	private java.sql.Date tglLahir;

	@Column(name = "tempat_lahir", length = 50)
	private String tmptLahir;

	@OneToOne
	@JoinColumn(name = "idperson", unique = true, nullable = false)
	private Person person;

	public Integer getIdBio() {
		return idBio;
	}

	public void setIdBio(Integer idBio) {
		this.idBio = idBio;
	}

	public String getNoHp() {
		return noHp;
	}

	public void setNoHp(String noHp) {
		this.noHp = noHp;
	}


	public java.sql.Date getTglLahir() {
		return tglLahir;
	}

	public void setTglLahir(java.sql.Date tglLahir) {
		this.tglLahir = tglLahir;
	}

	public String getTmptLahir() {
		return tmptLahir;
	}

	public void setTmptLahir(String tmptLahir) {
		this.tmptLahir = tmptLahir;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

}
