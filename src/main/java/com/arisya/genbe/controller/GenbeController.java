package com.arisya.genbe.controller;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//import com.arisya.spring.model.dto.FormDto;
//import com.arisya.spring.service.FormService;

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
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/index2";
	}
	
	@GetMapping("/home/pendidikan")
	public String IndexThree() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/index5";
	}
	
}
