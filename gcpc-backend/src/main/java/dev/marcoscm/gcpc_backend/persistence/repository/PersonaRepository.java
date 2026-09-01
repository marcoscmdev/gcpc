package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.PersonaEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface PersonaRepository extends ListCrudRepository<PersonaEntity, Integer> {
}
