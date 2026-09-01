package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicTomoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicTomoId;
import org.springframework.data.repository.ListCrudRepository;

public interface ComicTomoRepository extends ListCrudRepository<ComicTomoEntity, ComicTomoId> {
}
