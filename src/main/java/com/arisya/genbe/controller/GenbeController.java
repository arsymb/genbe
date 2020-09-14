package com.arisya.genbe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import groovyjarjarpicocli.CommandLine.Model;

@Controller
public class GenbeController {

	@GetMapping("/home")
	public String base() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/home";
	}
	
	@GetMapping("/home/biodata")
	public String IndexOne() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/index4";
	}
	
	@GetMapping("/home/data")
	public String IndexTwo() {
		return "index/index2";
	}
	
	@GetMapping("/home/pendidikan")
	public String IndexThree() {
		return "index/index5";
	}

	@GetMapping("/home/index6")
	public String IndexSix() {
		return "index/index6";
	}

	@GetMapping("/home/index7")
	public String IndexSeven(Model model) {
		// PersonDto personDto = new PersonDto();
		// model.addAttribute("formDto", personDto);
		return "index/index7";
	}
	
}
