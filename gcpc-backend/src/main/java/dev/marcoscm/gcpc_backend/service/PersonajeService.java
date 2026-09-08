package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicPersonajeRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.PersonajeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonajeService {
    private final PersonajeRepository personajeRepository;
    private final ComicPersonajeRepository comicPersonajeRepository;
    private final ComicTomoRepository comicTomoRepository;

    public PersonajeService(PersonajeRepository personajeRepository, ComicPersonajeRepository comicPersonajeRepository, ComicTomoRepository comicTomoRepository) {
        this.personajeRepository = personajeRepository;
        this.comicPersonajeRepository = comicPersonajeRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    private ComicConTomoDto mapComicConTomos(ComicEntity comic) {
        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream()
                .map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(),
                        ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(), ct.getTomo().getCoverPath()))
                .toList();
        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), tomos);
    }

    public List<ComicConTomoDto> buscarComicsPorPersonaje(String nombre) {
        return comicPersonajeRepository.findComicsByPersonajeNombre(nombre).stream()
                .map(this::mapComicConTomos)
                .toList();
    }

}
