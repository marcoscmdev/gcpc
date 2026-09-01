package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonajeEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonajeId;
import org.springframework.data.repository.ListCrudRepository;

public interface ComicPersonajeRepository extends ListCrudRepository<ComicPersonajeEntity, ComicPersonajeId> {
}
