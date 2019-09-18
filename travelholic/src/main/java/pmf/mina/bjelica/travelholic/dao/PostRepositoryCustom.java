package pmf.mina.bjelica.travelholic.dao;

import java.util.Date;
import java.util.List;

import pmf.mina.bjelica.travelholic.model.dto.SearchDto;
import pmf.mina.bjelica.travelholic.model.entity.Post;

public interface PostRepositoryCustom {
	

	List<Post> filterPosts(SearchDto searchDto);

}
