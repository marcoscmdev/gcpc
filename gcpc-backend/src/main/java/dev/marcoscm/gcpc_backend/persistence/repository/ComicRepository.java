package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface ComicRepository extends ListCrudRepository<ComicEntity, Integer> {
    Optional<ComicEntity> findByGcdIssueId(Integer gcdIssueId);
}
