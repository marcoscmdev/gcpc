package dev.marcoscm.gcpc_backend.dto;

import dev.marcoscm.gcpc_backend.persistence.entity.TipoPersonaje;

public record PersonajeResumenDto(
        Integer id,
        String nombre,
        TipoPersonaje tipo,
        String nombreReal,
        String descripcion
) {
}
