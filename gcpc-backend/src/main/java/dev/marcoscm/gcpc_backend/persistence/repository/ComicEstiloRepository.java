package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEstiloId;
import org.springframework.data.repository.ListCrudRepository;

public interface ComicEstiloRepository extends ListCrudRepository<ComicEstiloEntity, ComicEstiloId> {
}
