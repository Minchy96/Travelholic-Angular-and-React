package pmf.mina.bjelica.travelholic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pmf.mina.bjelica.travelholic.dao.CityRepo;
import pmf.mina.bjelica.travelholic.model.entity.City;

@Service
public class CityServiceImpl implements CityService {
	
	@Autowired
	CityRepo cityRepo;

	@Override
	public List<City> getAll() {
		// TODO Auto-generated method stub
		return cityRepo.findAll();
	}

	@Override
	public List<City> get(String country) {
		// TODO Auto-generated method stub
		return cityRepo.findCityByCountry(country);
	}

}
