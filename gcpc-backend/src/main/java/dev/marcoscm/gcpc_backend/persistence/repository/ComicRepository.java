package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ComicRepository extends ListCrudRepository<ComicEntity, Integer> {
    List<ComicEntity> findByGcdIssueId(Integer gcdIssueId);

    @Query(nativeQuery = true, value = """
            SELECT c.* FROM mi_comic c
            LEFT JOIN gcd_issue i ON i.id = c.gcd_issue_id
            WHERE EXISTS (SELECT 1 FROM mi_comic_etapa ce WHERE ce.comic_id = c.id AND ce.etapa_id = :etapaId)
            ORDER BY COALESCE(i.key_date, CONCAT(c.anio, '-00-00')), CAST(c.numero AS UNSIGNED), c.id
            """)
    List<ComicEntity> findByEtapaId(@Param("etapaId") Integer etapaId);

    // Incluye los comics de los arcos hijos (arco_padre_id), para que una saga muestre los de sus arcos
    @Query(nativeQuery = true, value = """
            WITH RECURSIVE sub AS (
                SELECT id FROM mi_arco_argumental WHERE id = :arcoId
                UNION ALL
                SELECT a.id FROM mi_arco_argumental a JOIN sub s ON a.arco_padre_id = s.id
            )
            SELECT c.* FROM mi_comic c
            LEFT JOIN gcd_issue i ON i.id = c.gcd_issue_id
            WHERE EXISTS (SELECT 1 FROM mi_comic_arco ca WHERE ca.comic_id = c.id AND ca.arco_id IN (SELECT id FROM sub))
            ORDER BY COALESCE(i.key_date, CONCAT(c.anio, '-00-00')), CAST(c.numero AS UNSIGNED), c.id
            """)
    List<ComicEntity> findByArcoIdConSubarcos(@Param("arcoId") Integer arcoId);
}
