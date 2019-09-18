package pmf.mina.bjelica.travelholic.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import pmf.mina.bjelica.travelholic.model.dto.PostDto;
import pmf.mina.bjelica.travelholic.model.dto.SearchDto;
import pmf.mina.bjelica.travelholic.model.dto.UserDto;
import pmf.mina.bjelica.travelholic.model.entity.Post;
import pmf.mina.bjelica.travelholic.service.PostService;
import pmf.mina.bjelica.travelholic.service.StorageService;

@Controller
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostApi {

	@Autowired
	PostService postService;
	
	@Autowired
	StorageService storageService;

	@RequestMapping(method = RequestMethod.POST, value = "/search")
	public ResponseEntity<?> search(@RequestBody SearchDto searchDto) {

		 List<Post> posts = postService.getPostsByFilter(searchDto);
		 
		return new ResponseEntity<Object>(posts,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{idPost}")
	public ResponseEntity<?> getPost(@PathVariable Integer idPost) {
		System.out.println("usao");

		Post post = postService.getPost(idPost);

		return new ResponseEntity<Object>(post, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/getAll")
	public ResponseEntity<?> getAllPosts() {
		System.out.println("usao");

		List<Post> posts = postService.getAll();

		return new ResponseEntity<Object>(posts, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/save")
	public ResponseEntity<?> savePost(@RequestBody PostDto postDto) {
		System.out.println("usao");

		Post post = postService.save(postDto);

		return new ResponseEntity<Object>(post, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/{username}")
	public ResponseEntity<?> getPostUsername(@PathVariable String username) {
		System.out.println("usao");

		List<Post> posts = postService.getPosts(username);

		return new ResponseEntity<Object>(posts, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/{postId}")
	public ResponseEntity<?> deletePost(@PathVariable Integer postId) {
		System.out.println("usao");

		boolean ok = postService.delete(postId);

		return new ResponseEntity<Object>(ok, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/getAll/{dateStart}/{dateEnd}")
	public ResponseEntity<?> getDatePosts(@PathVariable String dateStart, @PathVariable String dateEnd) {

		List<Post> posts = postService.getPostsByDate(dateStart, dateEnd);

		return new ResponseEntity<Object>(posts, HttpStatus.OK);
	}

	
	@RequestMapping(method = RequestMethod.GET, value = "/favourite/{username}/{postId}")
	public ResponseEntity<?> favourite(@PathVariable String username, @PathVariable Integer postId) {

		 boolean ok = postService.addFavourite(username,postId);
		 
		return new ResponseEntity<Object>(ok,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/getFavourite/{username}")
	public ResponseEntity<?> getFavourite(@PathVariable String username) {

		List<Post> posts = postService.getFavourite(username);
		 
		return new ResponseEntity<Object>(posts,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/removeFavourite/{username}/{postId}")
	public ResponseEntity<?> removeFavourite(@PathVariable String username, @PathVariable Integer postId) {

		 boolean ok = postService.removeFavourite(username,postId);
		 
		return new ResponseEntity<Object>(ok,HttpStatus.OK);
	}
	@RequestMapping(method = RequestMethod.POST, value = "/uploadImage/{id}")
	public ResponseEntity<?> userUpdate(@RequestBody MultipartFile file, @PathVariable Integer id) {
		String message = "";
		try {
			storageService.store(file);
			postService.saveImage(file.getOriginalFilename(),id);
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/getImage/{fileName}")
	public ResponseEntity<?> getImage(@PathVariable String fileName) {
		System.out.println("Ovde sam");
		String encodeBase64 = null;
		String image = null;
		String mediaType = null;
		try {
			Resource fileResource = storageService.loadFile(fileName);
			File file = fileResource.getFile();
			byte[] bytesArray = new byte[(int) file.length()];
			FileInputStream fis = new FileInputStream(file);
			fis.read(bytesArray); // read file into bytes[]
			encodeBase64 = Base64.getEncoder().encodeToString(bytesArray);
			mediaType = Files.probeContentType(file.toPath());
			System.out.println(mediaType);
			image = "data:"+mediaType+";base64," + encodeBase64;
			fis.close();
			return new ResponseEntity<String>(image, HttpStatus.OK);
		} catch (Exception e) {
			String message = "Doslo je do greske.";
			return new ResponseEntity<String>("", HttpStatus.OK);
		}
	}
}
