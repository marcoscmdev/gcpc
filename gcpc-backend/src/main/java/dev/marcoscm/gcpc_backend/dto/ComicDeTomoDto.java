package dev.marcoscm.gcpc_backend.dto;

import java.util.List;

public record ComicDeTomoDto(
        Integer id,
        String nombre,
        String numero,
        Integer anho,
        Integer ranking,
        String notas,
        Integer orden,
        String coverPath,
        EtapaResumenDto etapa,
        List<PersonaConRolDto> personas,
        List<PersonajeResumenDto> personajes,
        List<EstiloResumenDto> estilos,
        List<ArcoResumenDto> arcos
) {
}
