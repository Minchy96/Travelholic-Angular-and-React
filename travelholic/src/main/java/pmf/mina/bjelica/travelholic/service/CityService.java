package pmf.mina.bjelica.travelholic.service;

import java.util.List;

import pmf.mina.bjelica.travelholic.model.entity.City;

public interface CityService {

	List<City> getAll();

	List<City> get(String country);

}
