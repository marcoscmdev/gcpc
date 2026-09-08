package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ComicEstiloRepository extends ListCrudRepository<ComicEstiloEntity, ComicEstiloId> {

    @Query("SELECT ce FROM ComicEstiloEntity ce JOIN FETCH ce.estilo WHERE ce.comic.id = :comicId")
    List<ComicEstiloEntity> findByComicIdConEstilo(@Param("comicId") Integer comicId);

    @Query("SELECT DISTINCT ce.comic FROM ComicEstiloEntity ce WHERE ce.estilo.nombre LIKE %:nombre%")
    List<ComicEntity> findComicsByEstiloNombre(@Param("nombre") String nombre);
}
