package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoId;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface ComicArcoRepository extends ListCrudRepository<ComicArcoEntity, ComicArcoId> {
    List<ComicArcoEntity> findByArco_Id(Integer arcoId);
}
