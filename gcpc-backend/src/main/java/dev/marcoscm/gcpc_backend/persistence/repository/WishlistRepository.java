package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.WishlistEntity;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface WishlistRepository extends ListCrudRepository<WishlistEntity, Integer> {
    Optional<WishlistEntity> findByGcdIssueId(Integer gcdIssueId);
}
