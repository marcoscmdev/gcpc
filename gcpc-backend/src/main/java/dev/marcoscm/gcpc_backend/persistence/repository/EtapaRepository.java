package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.EtapaEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EtapaRepository extends ListCrudRepository<EtapaEntity, Integer> {

    @Query("SELECT c FROM ComicEntity c JOIN FETCH c.etapa e WHERE e.nombre LIKE %:nombre%")
    List<ComicEntity> findByEtapaNombreConEtapa(@Param("nombre") String nombre);
}
