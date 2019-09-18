package pmf.mina.bjelica.travelholic.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import pmf.mina.bjelica.travelholic.model.dto.UserDto;
import pmf.mina.bjelica.travelholic.model.entity.Chat;
import pmf.mina.bjelica.travelholic.service.ChatService;

@Controller
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatApi {
	
	
	@Autowired
	private ChatService chatService;
	
	@RequestMapping(method = RequestMethod.GET, value = "/get/{user1}/{user2}")
	public ResponseEntity<?> saveUser(@PathVariable String user1, @PathVariable String user2) {
		System.out.println("usao");

		Chat chat = chatService.get(user1,user2);
		
		return new ResponseEntity<Object>(chat,HttpStatus.OK);
	}

}
