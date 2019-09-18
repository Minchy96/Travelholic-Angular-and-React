package pmf.mina.bjelica.travelholic.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pmf.mina.bjelica.travelholic.dao.UserRepository;
import pmf.mina.bjelica.travelholic.model.dto.LoginDto;
import pmf.mina.bjelica.travelholic.model.dto.UserDto;
import pmf.mina.bjelica.travelholic.model.entity.User;

/*
*	Services are data access objects
*	We use service in controllers to access data
*
*/
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;
	

	@Override
	public List<User> findAll() {
		return userRepo.findAll();
	}

	@Override
	public void save(UserDto userDto) {
		User user = new User();
		user.setAddress(userDto.getAddress());

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date;
		try {
			date = sdf.parse(userDto.getBirthDate());
			user.setBirthDate(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		user.setCaption(userDto.getCaption());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setPassword(userDto.getPassword());
		user.setUsername(userDto.getUsername());
		user.setEmail(userDto.getEmail());
		
		userRepo.save(user);

	}

	@Override
	public int login(LoginDto loginDto) {
		User u = userRepo.findUserByUsername(loginDto.getUsername());
		if (u == null)
			return 1;
		if (u.getPassword().equals(loginDto.getPassword()))
			return 0;
		else
			return 1;
	}

	@Override
	public User get(String username) {

		return userRepo.findUserByUsername(username);
	}

	@Override
	public User update(UserDto userDto) {
		User user = userRepo.findUserByUsername(userDto.getUsername());

		System.out.println(user.getUsername() + "menjam tebe");

		if (userDto.getAddress() != null) {
			user.setAddress(userDto.getAddress());
		}

		if (userDto.getCaption() != null) {
			user.setCaption(userDto.getCaption());
		}

		if (userDto.getFirstName() != null) {
			user.setFirstName(userDto.getFirstName());
		}

		if (userDto.getLastName() != null) {
			user.setLastName(userDto.getLastName());
		}

		if (userDto.getEmail() != null) {
			user.setEmail(userDto.getEmail());
		}

		if (userDto.getNewUsername() != null) {
			user.setUsername(userDto.getNewUsername());
		}

		if (userDto.getPassword() != null) {
			user.setPassword(userDto.getPassword());
		}

		return userRepo.saveAndFlush(user);
	}

	@Override
	public boolean tryUsername(String username) {
		User u = userRepo.findUserByUsername(username);

		return u == null ? true : false;
	}
	
	@Override
	public boolean setImage(String imageName,String username) {
		User user = userRepo.findUserByUsername(username);
		user.setImageName(imageName);
		
		try {
			userRepo.saveAndFlush(user);
			return true;
		}catch (Exception e) {
			return false;
		}
	}


}
