package pmf.mina.bjelica.travelholic.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pmf.mina.bjelica.travelholic.model.dto.SearchDto;
import pmf.mina.bjelica.travelholic.model.entity.Post;

@Transactional
@Repository
public class PostRepositoryImpl implements PostRepositoryCustom {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Post> filterPosts(SearchDto searchDto) {
		String sql = "SELECT p FROM Post p ";
		boolean firstParm=false;
		
		if (searchDto.getCity() != null && !searchDto.getCity().isEmpty()) {
			if (firstParm == false) {
				firstParm = true;
				sql += " WHERE p.city.name = '"+searchDto.getCity()+"'";
			} else {
				sql += " AND p.city.name = '"+searchDto.getCity()+"'";
			}
		}
		
		if (searchDto.getCountry() != null && !searchDto.getCountry().isEmpty()) {
			if (firstParm == false) {
				firstParm = true;
				sql += " WHERE p.city.country.name =  '"+searchDto.getCountry()+"'";
			} else {
				sql += " AND p.city.country.name = '"+searchDto.getCountry()+"'";
			}
		}
		
		if (searchDto.getStart() != null && !searchDto.getStart().isEmpty()) {
			if (firstParm == false) {
				firstParm = true;
				sql += " WHERE p.start >= '"+searchDto.getStart()+"'";
			} else {
				sql += " AND  p.start >= '"+ searchDto.getStart() +"'";
			}
		}
		
		if (searchDto.getEnd() != null && !searchDto.getEnd().isEmpty()) {
			if (firstParm == false) {
				firstParm = true;
				sql += " WHERE p.end <= '"+searchDto.getEnd()+"'";
			} else {
				sql += " AND  p.end <= '" + searchDto.getEnd() +"'";
			}
		}
		
		System.out.println(sql);
		return  entityManager.createQuery(sql).getResultList();
	}
	
	

}
