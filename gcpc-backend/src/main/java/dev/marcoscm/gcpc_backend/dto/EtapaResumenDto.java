package dev.marcoscm.gcpc_backend.dto;

import dev.marcoscm.gcpc_backend.persistence.entity.TipoEtapa;

public record EtapaResumenDto(
        Integer id,
        String nombre,
        Integer anhoInicio,
        Integer anhoFin,
        TipoEtapa tipo
) {
}
