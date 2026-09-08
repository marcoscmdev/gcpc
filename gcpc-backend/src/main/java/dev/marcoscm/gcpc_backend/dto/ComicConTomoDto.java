package dev.marcoscm.gcpc_backend.dto;

import java.util.List;

public record ComicConTomoDto(
        Integer id,
        String nombre,
        String numero,
        Integer anho,
        String coverPath,
        List<TomoResumenDto> tomos
) {
}
