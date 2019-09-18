package pmf.mina.bjelica.travelholic.dao;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pmf.mina.bjelica.travelholic.model.entity.Post;
import pmf.mina.bjelica.travelholic.model.entity.User;

public interface PostRepository extends JpaRepository<Post, Integer> , PostRepositoryCustom {
	

    @Query("SELECT p FROM Post p where p.id = :id") 
    Optional<Post> findById(@Param("id") Integer id);
    
    @Query("SELECT p FROM Post p where p.user = :user") 
    List<Post> findByUser(@Param("user") User user);
    
    @Query("SELECT p FROM Post p where p.start >= :start and p.end <= :end ") 
    List<Post> findByDate(@Param("start") Date start, @Param("end") Date end);
    
    @Query("SELECT p FROM Post p where p.start >= :start and p.end <= :end and p.city.name = :city and p.city.country.name = :country ") 
    List<Post> findPostsByFilter(@Param("start") Date start, @Param("end") Date end, @Param("city") String city, @Param("country") String country);
    
    

}
