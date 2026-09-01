package dev.marcoscm.gcpc_backend.dto;

public record ComicSearchResultDto(
        Integer gcdIssueId,
        String serie,
        String numero,
        String titulo,
        boolean loTengo
) {
}
