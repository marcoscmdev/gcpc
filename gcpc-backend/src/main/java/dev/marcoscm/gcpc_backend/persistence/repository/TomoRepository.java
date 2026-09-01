package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.TomoEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface TomoRepository extends ListCrudRepository<TomoEntity, Integer> {
}
