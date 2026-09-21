package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.PersonaConRolDto;
import dev.marcoscm.gcpc_backend.dto.PersonaResumenDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicPersonaEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.RolEnum;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicPersonaRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public List<PersonaResumenDto> getAllPersonas() {
        return personaRepository.findAll().stream()
                .map(p -> new PersonaResumenDto(p.getId(), p.getNombre(), p.getLocalidad()))
                .toList();
    }

    public List<ComicConTomoDto> buscarComicsPorPersona(String nombre, List<RolEnum> roles) {
        List<ComicPersonaEntity> filas = (roles == null || roles.isEmpty())
                ? comicPersonaRepository.findFilasByPersonaNombre(nombre)
                : comicPersonaRepository.findFilasByPersonaNombreYRol(nombre, roles);

        Map<Integer, List<ComicPersonaEntity>> porComic = filas.stream()
                .collect(Collectors.groupingBy(cp -> cp.getComic().getId()));

        return porComic.values().stream()
                .map(this::mapComicConTomos)
                .toList();
    }

    private ComicConTomoDto mapComicConTomos(List<ComicPersonaEntity> filasDelComic) {
        ComicEntity comic = filasDelComic.get(0).getComic();

        List<String> rolesDeLaPersona = filasDelComic.stream()
                .map(cp -> cp.getRol().name())
                .toList();

        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream()
                .map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(),
                        ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(), ct.getTomo().getCoverPath()))
                .toList();

        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), rolesDeLaPersona, tomos);
    }
}
