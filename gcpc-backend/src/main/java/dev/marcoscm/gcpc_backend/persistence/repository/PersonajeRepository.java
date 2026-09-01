package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.PersonajeEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface PersonajeRepository extends ListCrudRepository<PersonajeEntity, Integer> {
}
