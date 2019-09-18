package pmf.mina.bjelica.travelholic.service;

import java.util.List;

import pmf.mina.bjelica.travelholic.model.dto.PostDto;
import pmf.mina.bjelica.travelholic.model.dto.SearchDto;
import pmf.mina.bjelica.travelholic.model.entity.Post;

public interface PostService {

	Post getPost(int id);

	List<Post> getAll();

	Post save(PostDto postDto);

	List<Post> getPosts(String username);

	boolean delete(Integer postId);

	List<Post> getPostsByDate(String dateStart, String dateEnd);

	List<Post> getPostsByFilter(SearchDto searchDto);

	boolean addFavourite(String username, Integer postId);

	List<Post> getFavourite(String username);

	boolean removeFavourite(String username, Integer postId);

	void saveImage(String originalFilename, Integer id);

}
