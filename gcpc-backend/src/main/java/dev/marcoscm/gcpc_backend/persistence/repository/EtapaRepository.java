package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.EtapaEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface EtapaRepository extends ListCrudRepository<EtapaEntity, Integer> {
}
