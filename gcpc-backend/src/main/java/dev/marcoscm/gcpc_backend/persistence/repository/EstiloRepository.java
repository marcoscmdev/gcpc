package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.EstiloEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface EstiloRepository extends ListCrudRepository<EstiloEntity, Integer> {
}
