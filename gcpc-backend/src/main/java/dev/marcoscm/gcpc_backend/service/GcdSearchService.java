package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicSearchResultDto;
import dev.marcoscm.gcpc_backend.persistence.entity.GcdIssueEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.GcdIssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GcdSearchService {
    private final GcdIssueRepository gcdIssueRepository;
    private final ComicRepository comicRepository;


    public GcdSearchService(GcdIssueRepository gcdIssueRepository, ComicRepository comicRepository) {
        this.gcdIssueRepository = gcdIssueRepository;
        this.comicRepository = comicRepository;
    }

    public List<ComicSearchResultDto> buscar(String serie, String numero) {
        return gcdIssueRepository.buscarPorSerieYNumero(serie, numero)
                .stream()
                .map(issue -> new ComicSearchResultDto(
                        issue.getId(),
                        issue.getSeries().getName(),
                        issue.getNumber(),
                        issue.getTitle(),
                        anioDe(issue),
                        !comicRepository.findByGcdIssueId(issue.getId()).isEmpty()
                ))
                .toList();
    }

    public List<ComicSearchResultDto>buscarporRango(String serie, Integer desde, Integer hasta){
        return gcdIssueRepository.buscarPorRango(serie, desde, hasta).stream().map(issue -> new ComicSearchResultDto(
                issue.getId(), serie, issue.getNumber(), issue.getTitle(), anioDe(issue), !comicRepository.findByGcdIssueId(issue.getId()).isEmpty()
        ) ).toList();
    }

    private Integer anioDe(GcdIssueEntity issue) {
        String fecha = issue.getKeyDate();
        if (fecha == null || fecha.length() < 4) return null;
        try {
            return Integer.valueOf(fecha.substring(0, 4));
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
