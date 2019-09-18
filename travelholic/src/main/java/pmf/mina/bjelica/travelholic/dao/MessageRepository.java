package pmf.mina.bjelica.travelholic.dao;

import org.apache.logging.log4j.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}
