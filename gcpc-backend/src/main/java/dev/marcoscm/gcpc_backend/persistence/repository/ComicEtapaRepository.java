package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEtapaEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEtapaId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicEtapaRepository extends ListCrudRepository<ComicEtapaEntity, ComicEtapaId> {

    @Query("SELECT ce FROM ComicEtapaEntity ce JOIN FETCH ce.etapa e WHERE ce.comic.id = :comicId ORDER BY e.anhoInicio, e.id")
    List<ComicEtapaEntity> findByComicIdConEtapa(@Param("comicId") Integer comicId);
}
