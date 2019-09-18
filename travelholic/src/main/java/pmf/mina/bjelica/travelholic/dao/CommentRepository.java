package pmf.mina.bjelica.travelholic.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pmf.mina.bjelica.travelholic.model.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
