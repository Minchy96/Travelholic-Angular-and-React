package pmf.mina.bjelica.travelholic.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pmf.mina.bjelica.travelholic.model.entity.City;

public interface CityRepo extends JpaRepository<City, Integer> {
	
	@Query("SELECT c FROM City c WHERE c.name LIKE :name")
	City findCityByName(@Param("name") String name);
	
	@Query("SELECT c FROM City c WHERE c.country.name LIKE :country")
	List<City> findCityByCountry(@Param("country") String country);

}
