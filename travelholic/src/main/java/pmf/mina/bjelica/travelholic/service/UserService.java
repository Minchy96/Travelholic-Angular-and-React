package pmf.mina.bjelica.travelholic.service;

import java.util.List;

import pmf.mina.bjelica.travelholic.model.dto.LoginDto;
import pmf.mina.bjelica.travelholic.model.dto.UserDto;
import pmf.mina.bjelica.travelholic.model.entity.User;

public interface UserService {

	void save(UserDto userDto);

	List<User> findAll();

	int login(LoginDto loginDto);

	User get(String username);

	User update(UserDto userDto);

	boolean tryUsername(String username);

	boolean setImage(String imageName, String username);


}
