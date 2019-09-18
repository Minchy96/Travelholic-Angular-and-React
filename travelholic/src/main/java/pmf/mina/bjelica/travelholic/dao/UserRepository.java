package pmf.mina.bjelica.travelholic.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pmf.mina.bjelica.travelholic.model.entity.Post;
import pmf.mina.bjelica.travelholic.model.entity.User;



public interface UserRepository extends JpaRepository<User, Integer> {
//	@Query("SELECT u FROM User u WHERE u.status = ?1")
//	User findUserByStatus(Integer status);
	
	@Query("SELECT u FROM User u WHERE u.username LIKE :username")
	User findUserByUsername(@Param("username") String username);
	
	@Query("SELECT u.posts1 FROM User u WHERE u.username LIKE :username")
	List<Post> findUsersFavourite(@Param("username") String username);
}
