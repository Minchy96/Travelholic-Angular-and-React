package pmf.mina.bjelica.travelholic.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pmf.mina.bjelica.travelholic.model.entity.Country;

public interface CountryRepo extends JpaRepository<Country, Integer> {
	
	@Query("SELECT c FROM Country c WHERE c.name LIKE :name")
	Country findCountryByName(@Param("name") String name);



}
