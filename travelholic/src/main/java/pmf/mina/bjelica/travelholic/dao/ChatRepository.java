package pmf.mina.bjelica.travelholic.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pmf.mina.bjelica.travelholic.model.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

}
