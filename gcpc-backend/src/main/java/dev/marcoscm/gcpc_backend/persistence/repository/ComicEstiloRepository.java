package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicEstiloRepository extends ListCrudRepository<ComicEstiloEntity, ComicEstiloId> {

    @Query("SELECT ce FROM ComicEstiloEntity ce JOIN FETCH ce.estilo WHERE ce.comic.id = :comicId")
    List<ComicEstiloEntity> findByComicIdConEstilo(@Param("comicId") Integer comicId);
}
