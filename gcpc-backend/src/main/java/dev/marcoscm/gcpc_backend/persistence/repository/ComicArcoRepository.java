package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicArcoRepository extends ListCrudRepository<ComicArcoEntity, ComicArcoId> {
    List<ComicArcoEntity> findByArco_Id(Integer arcoId);
    @Query("SELECT ca FROM ComicArcoEntity ca JOIN FETCH ca.arco WHERE ca.comic.id = :comicId")
    List<ComicArcoEntity> findByComicIdConArco(@Param("comicId") Integer comicId);

    @Query("SELECT ca FROM ComicArcoEntity ca JOIN FETCH ca.comic WHERE ca.arco.nombre LIKE %:nombre%")
    List<ComicArcoEntity> findByArcoNombreConComic(@Param("nombre") String nombre);
}
