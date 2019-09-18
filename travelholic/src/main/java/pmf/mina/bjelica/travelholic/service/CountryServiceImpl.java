package pmf.mina.bjelica.travelholic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pmf.mina.bjelica.travelholic.dao.CountryRepo;
import pmf.mina.bjelica.travelholic.model.entity.Country;

@Service
public class CountryServiceImpl implements CountryService {
	
	@Autowired
	CountryRepo countryRepo;
	
	@Override
	public List<Country> getAll() {
		// TODO Auto-generated method stub
		return countryRepo.findAll();
	}

}
