package dev.marcoscm.gcpc_backend.dto;

import dev.marcoscm.gcpc_backend.persistence.entity.TipoArco;

public record ArcoResumenDto(
        Integer id,
        String nombre,
        String nombreOriginal,
        Integer anho,
        TipoArco tipo,
        String descripcion
) {
}
