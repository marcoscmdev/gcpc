package dev.marcoscm.gcpc_backend.dto;

public record EtapaResumenDto(
        Integer id,
        String nombre,
        Integer anhoInicio,
        Integer anhoFin
) {
}
