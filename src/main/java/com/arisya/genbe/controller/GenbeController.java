package com.arisya.genbe.controller;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//import com.arisya.spring.model.dto.FormDto;
//import com.arisya.spring.service.FormService;

@Controller
public class GenbeController {

	@GetMapping("/base")
	public String base() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "base";
	}
	
	@GetMapping("/base/index1")
	public String IndexOne() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/modals1";
	}
	
	@GetMapping("/base/index2")
	public String IndexTwo() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/index2";
	}
	
	@GetMapping("/base/index3")
	public String IndexThree() {
//		FormDto formDto = new FormDto();
//		model.addAttribute("formDto", formDto);
		return "index/modals3";
	}
	
}
