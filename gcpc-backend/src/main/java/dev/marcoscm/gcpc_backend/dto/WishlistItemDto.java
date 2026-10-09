package dev.marcoscm.gcpc_backend.dto;

public record WishlistItemDto(
        Integer id,
        Integer gcdIssueId,
        String serie,
        String numero,
        String titulo,
        Integer anio,
        String notas,
        boolean loTengo
) {
}
