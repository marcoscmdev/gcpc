package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonaEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonaId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicPersonaRepository extends ListCrudRepository<ComicPersonaEntity, ComicPersonaId> {

    @Query("SELECT cp FROM ComicPersonaEntity cp JOIN FETCH cp.persona WHERE cp.comic.id = :comicId")
    List<ComicPersonaEntity> findByComicIdConPersona(@Param("comicId") Integer comicId);

}
