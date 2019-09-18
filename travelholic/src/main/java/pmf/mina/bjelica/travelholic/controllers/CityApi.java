package pmf.mina.bjelica.travelholic.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import pmf.mina.bjelica.travelholic.model.entity.City;
import pmf.mina.bjelica.travelholic.service.CityService;


@Controller
@RequestMapping(value="/city")
@CrossOrigin(origins = "http://localhost:4200")
public class CityApi {
	
	@Autowired
	CityService cityService;
	
	@RequestMapping(method = RequestMethod.GET, value="/getAll")
	public ResponseEntity<?> getAllCities() {

		List<City> cities = cityService.getAll();
		
		return new ResponseEntity<Object>(cities,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/get/{country}")
	public ResponseEntity<?> get(@PathVariable String country) {

		List<City> cities = cityService.get(country);
		
		return new ResponseEntity<Object>(cities,HttpStatus.OK);
	}
}
