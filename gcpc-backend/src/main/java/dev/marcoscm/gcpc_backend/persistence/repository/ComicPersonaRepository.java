package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonaEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonaId;
import org.springframework.data.repository.ListCrudRepository;

public interface ComicPersonaRepository extends ListCrudRepository<ComicPersonaEntity, ComicPersonaId> {
}
