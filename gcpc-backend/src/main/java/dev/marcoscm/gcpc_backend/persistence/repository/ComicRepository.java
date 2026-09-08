package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ComicRepository extends ListCrudRepository<ComicEntity, Integer> {
    Optional<ComicEntity> findByGcdIssueId(Integer gcdIssueId);

    @Query("SELECT c FROM ComicEntity c LEFT JOIN FETCH c.etapa")
    List<ComicEntity> findAllConEtapa();

}
