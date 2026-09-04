package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicTomoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicTomoId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicTomoRepository extends ListCrudRepository<ComicTomoEntity, ComicTomoId> {

    @Query("SELECT ct FROM ComicTomoEntity ct " +
            "JOIN FETCH ct.comic c " +
            "LEFT JOIN FETCH c.etapa " +
            "WHERE ct.tomo.id = :tomoId ORDER BY ct.orden")
    List<ComicTomoEntity> findByTomoIdOrdenado(@Param("tomoId") Integer tomoId);

    @Query("SELECT ct FROM ComicTomoEntity ct JOIN FETCH ct.tomo WHERE ct.comic.id = :comicId")
    List<ComicTomoEntity> findByComicIdConTomo(@Param("comicId") Integer comicId);

}

