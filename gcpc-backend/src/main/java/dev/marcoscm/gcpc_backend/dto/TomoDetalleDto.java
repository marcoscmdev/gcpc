package dev.marcoscm.gcpc_backend.dto;

import java.util.List;

public record TomoDetalleDto(
        Integer id,
        String nombre,
        String isbn,
        String editorial,
        Integer anhoEdicion,
        String coverPath,
        List<ComicResumenDto> comicsContiene
) {
}
