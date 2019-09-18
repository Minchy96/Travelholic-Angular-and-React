package pmf.mina.bjelica.travelholic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import pmf.mina.bjelica.travelholic.model.dto.CommentDto;
import pmf.mina.bjelica.travelholic.model.entity.Comment;
import pmf.mina.bjelica.travelholic.service.CommentService;

@Controller
@RequestMapping(value="/comment")
@CrossOrigin(origins="http://localhost:4200")
public class CommentApi {
	
	@Autowired
	CommentService commentService;

	@RequestMapping(method = RequestMethod.POST, value="/save")
	public ResponseEntity<?> saveComment(@RequestBody CommentDto commentDto) {
		System.out.println("usao");
		
		Comment comment = commentService.save(commentDto);
		
		return new ResponseEntity<Object>(comment,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value="/delete/{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable Integer commentId) {
		System.out.println("usao");
		
		boolean ok = commentService.delete(commentId);
		
		return new ResponseEntity<Object>(ok,HttpStatus.OK);
	}

}
