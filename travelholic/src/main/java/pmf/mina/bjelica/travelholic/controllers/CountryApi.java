package pmf.mina.bjelica.travelholic.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import pmf.mina.bjelica.travelholic.dao.CountryRepo;
import pmf.mina.bjelica.travelholic.model.entity.Country;
import pmf.mina.bjelica.travelholic.service.CountryService;

@Controller
@RequestMapping(value="/country")
@CrossOrigin(origins="http://localhost:4200")
public class CountryApi {
	
	@Autowired
	CountryService conutryService;
	
	@RequestMapping(method = RequestMethod.GET, value="/getAll")
	public ResponseEntity<?> getAll() {

		List<Country> countries = conutryService.getAll();
		
		return new ResponseEntity<Object>(countries,HttpStatus.OK);
	}

}
