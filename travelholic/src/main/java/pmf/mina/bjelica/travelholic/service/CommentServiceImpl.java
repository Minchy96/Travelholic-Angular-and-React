package pmf.mina.bjelica.travelholic.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pmf.mina.bjelica.travelholic.dao.CommentRepository;
import pmf.mina.bjelica.travelholic.dao.PostRepository;
import pmf.mina.bjelica.travelholic.dao.UserRepository;
import pmf.mina.bjelica.travelholic.model.dto.CommentDto;
import pmf.mina.bjelica.travelholic.model.entity.Comment;
import pmf.mina.bjelica.travelholic.model.entity.Post;
import pmf.mina.bjelica.travelholic.model.entity.User;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PostRepository postRepo;

	@Override
	public Comment save(CommentDto commentDto) {
		Comment comment  = new Comment();
		
		User user = userRepo.findUserByUsername(commentDto.getUsername());
		comment.setUser(user);
		
		Post post = postRepo.getOne(commentDto.getPostId());
		comment.setPost(post);
		
		comment.setText(commentDto.getText());
		
		
		return commentRepo.save(comment);
	}

	@Override
	public boolean delete(Integer commentId) {
		try {
		 commentRepo.deleteById(commentId);
		 return true;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return false;
		}
		
	}

}
