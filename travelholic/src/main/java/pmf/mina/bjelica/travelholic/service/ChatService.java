package pmf.mina.bjelica.travelholic.service;

import pmf.mina.bjelica.travelholic.model.entity.Chat;

public interface ChatService {

	Chat get(String user1, String user2);

}
