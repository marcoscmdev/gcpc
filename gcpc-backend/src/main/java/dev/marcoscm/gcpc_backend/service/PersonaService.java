package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicPersonaRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService {
    private final PersonaRepository personaRepository;
    private final ComicPersonaRepository comicPersonaRepository;
    private final ComicTomoRepository comicTomoRepository;

    public PersonaService(PersonaRepository personaRepository,
                          ComicPersonaRepository comicPersonaRepository,
                          ComicTomoRepository comicTomoRepository) {
        this.personaRepository = personaRepository;
        this.comicPersonaRepository = comicPersonaRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    public List<ComicConTomoDto> buscarComicsPorPersona(String nombre) {
        return comicPersonaRepository.findComicsByPersonaNombre(nombre).stream()
                .map(this::mapComicConTomos)
                .toList();
    }

    private ComicConTomoDto mapComicConTomos(ComicEntity comic) {
        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream()
                .map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(),
                        ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(), ct.getTomo().getCoverPath()))
                .toList();
        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), tomos);
    }
}
