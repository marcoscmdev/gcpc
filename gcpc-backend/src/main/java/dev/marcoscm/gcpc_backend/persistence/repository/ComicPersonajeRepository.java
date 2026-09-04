package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonajeEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonajeId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicPersonajeRepository extends ListCrudRepository<ComicPersonajeEntity, ComicPersonajeId> {
    @Query("SELECT cp FROM ComicPersonajeEntity cp JOIN FETCH cp.personaje WHERE cp.comic.id = :comicId")
    List<ComicPersonajeEntity> findByComicIdConPersonaje(@Param("comicId") Integer comicId);
}
