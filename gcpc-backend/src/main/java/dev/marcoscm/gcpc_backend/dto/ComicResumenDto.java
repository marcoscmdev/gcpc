package dev.marcoscm.gcpc_backend.dto;

public record ComicResumenDto(
        Integer id,
        String nombre,
        String numero,
        Integer anho,
        Integer ranking,
        String notas,
        Integer orden,
        String coverPath
) {
}
