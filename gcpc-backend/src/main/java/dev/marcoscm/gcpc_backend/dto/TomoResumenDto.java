package dev.marcoscm.gcpc_backend.dto;

public record TomoResumenDto(Integer id,
                             String nombre,
                             String editorial,
                             Integer anhoEdicion,
                             String coverPath) {
}
