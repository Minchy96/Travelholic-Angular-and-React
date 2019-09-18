package pmf.mina.bjelica.travelholic.service;

import pmf.mina.bjelica.travelholic.model.dto.CommentDto;
import pmf.mina.bjelica.travelholic.model.entity.Comment;

public interface CommentService {

	Comment save(CommentDto commentDto);

	boolean delete(Integer commentId);

}
