package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.TomoEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TomoRepository extends ListCrudRepository<TomoEntity, Integer> {

    @Query("SELECT t FROM TomoEntity t WHERE t.curiosidades LIKE %:texto%")
    List<TomoEntity> buscarPorCuriosidades(@Param("texto") String texto);
}
