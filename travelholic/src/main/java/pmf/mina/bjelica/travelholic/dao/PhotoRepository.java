package pmf.mina.bjelica.travelholic.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pmf.mina.bjelica.travelholic.model.entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {

}
