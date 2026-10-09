package dev.marcoscm.gcpc_backend.persistence.repository;

import dev.marcoscm.gcpc_backend.persistence.entity.GcdIssueEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface GcdIssueRepository extends Repository<GcdIssueEntity, Integer> {

    @Query("SELECT gi FROM GcdIssueEntity gi JOIN FETCH gi.series gs " +
            "WHERE gs.name LIKE %:seriesName% " +
            "AND (:number IS NULL OR gi.number = :number) " +
            "AND gi.variantOfId IS NULL " +
            "ORDER BY gs.name, gi.keyDate, gi.id")
    List<GcdIssueEntity> buscarPorSerieYNumero(@Param("seriesName") String seriesName,
                                               @Param("number") String number);

    @Query(value = "SELECT gi.* FROM gcd_series gs " +
            "JOIN gcd_issue gi ON gi.series_id = gs.id " +
            "WHERE gs.name = :seriesName " +
            "AND CAST(gi.number AS UNSIGNED) BETWEEN :desde AND :hasta " +
            "AND gi.variant_of_id IS NULL " +
            "ORDER BY CAST(gi.number AS UNSIGNED)",
            nativeQuery = true)
    List<GcdIssueEntity> buscarPorRango(@Param("seriesName") String seriesName,
                                        @Param("desde") Integer desde,
                                        @Param("hasta") Integer hasta);


    @Query(value = "SELECT gi.* FROM mi_etapa_rango r " +
            "JOIN gcd_issue gi ON gi.series_id = r.serie_id " +
            "WHERE r.etapa_id = :etapaId " +
            "AND CAST(gi.number AS UNSIGNED) BETWEEN r.num_desde AND r.num_hasta " +
            "AND gi.variant_of_id IS NULL " +
            "ORDER BY gi.series_id, CAST(gi.number AS UNSIGNED), gi.key_date, gi.id",
            nativeQuery = true)
    List<GcdIssueEntity> buscarPorEtapa(@Param("etapaId") Integer etapaId);

    List<GcdIssueEntity> findById(Integer id);
}
