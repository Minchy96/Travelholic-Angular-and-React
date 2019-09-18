package pmf.mina.bjelica.travelholic.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pmf.mina.bjelica.travelholic.dao.CityRepo;
import pmf.mina.bjelica.travelholic.dao.CountryRepo;
import pmf.mina.bjelica.travelholic.dao.PostRepository;
import pmf.mina.bjelica.travelholic.dao.UserRepository;
import pmf.mina.bjelica.travelholic.model.dto.PostDto;
import pmf.mina.bjelica.travelholic.model.dto.SearchDto;
import pmf.mina.bjelica.travelholic.model.entity.City;
import pmf.mina.bjelica.travelholic.model.entity.Country;
import pmf.mina.bjelica.travelholic.model.entity.Post;
import pmf.mina.bjelica.travelholic.model.entity.User;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepo;

	@Autowired
	private CountryRepo countryRepo;

	@Autowired
	private CityRepo cityRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Post getPost(int id) {
		return postRepo.findById(id).get();
	}

	@Override
	public List<Post> getAll() {
		return postRepo.findAll();
	}

	@Override
	public Post save(PostDto postDto) {
		Post post = new Post();

		Country country = countryRepo.findCountryByName(postDto.getCountry());
		if (country == null) {
			country = new Country();
			country.setName(postDto.getCountry());
			country = countryRepo.save(country);
		}

		City city = cityRepo.findCityByName(postDto.getCity());
		if (city == null) {
			city = new City();
			city.setCountry(country);
			city.setName(postDto.getCity());
			city.setZipcode(postDto.getZipcode());
			city = cityRepo.save(city);
		}
		post.setCity(city);

		post.setDescription(postDto.getDescription());
		post.setEnd(postDto.getEnd());
		post.setStart(postDto.getStart());
		post.setTitle(postDto.getTitle());
		post.setAmount(postDto.getAmount());

		User user = userRepo.findUserByUsername(postDto.getUsername());
		System.out.println(user.getUsername() + "eeeeeeeeeeeeee");
		post.setUser(user);

		return postRepo.save(post);
	}

	@Override
	public List<Post> getPosts(String username) {
		User user = userRepo.findUserByUsername(username);
		List<Post> posts = postRepo.findByUser(user);
		return posts;
	}

	@Override
	public boolean delete(Integer postId) {
		try {
			postRepo.deleteById(postId);
			return true;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Post> getPostsByDate(String dateStart, String dateEnd) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<Post> posts = new ArrayList<>();
		try {
			Date start = sdf.parse(dateStart);
			Date end = sdf.parse(dateEnd);
			posts = postRepo.findByDate(start, end);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return posts;
	}

	@Override
	public List<Post> getPostsByFilter(SearchDto searchDto) {
		return postRepo.filterPosts(searchDto);
	}

	@Override
	public boolean addFavourite(String username, Integer postId) {
		User u = userRepo.findUserByUsername(username);
		Post p = postRepo.getOne(postId);
		if (u.getPosts1().contains(p)) {
			return false;
		} else {
			u.getPosts1().add(p);
			u = userRepo.saveAndFlush(u);
			return true;
		}
	}

	@Override
	public List<Post> getFavourite(String username) {
		List<Post> favs = userRepo.findUsersFavourite(username);
		return favs;
	}

	@Override
	public boolean removeFavourite(String username, Integer postId) {
		User u = userRepo.findUserByUsername(username);
		Post p = postRepo.getOne(postId);
		u.getPosts1().remove(p);
		p.getUsers().remove(u);
		u = userRepo.saveAndFlush(u);
		p = postRepo.saveAndFlush(p);
		if (p != null && u != null)
			return true;
		return false;
	}

	@Override
	public void saveImage(String originalFilename, Integer id) {
		Post post = postRepo.getOne(id);
		post.setImageName(originalFilename);
		postRepo.saveAndFlush(post);
	}

}
