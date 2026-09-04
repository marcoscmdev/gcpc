package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.*;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ComicService {
    private final ComicRepository comicRepository;
    private final ComicPersonaRepository comicPersonaRepository;
    private final ComicPersonajeRepository comicPersonajeRepository;
    private final ComicEstiloRepository comicEstiloRepository;
    private final ComicArcoRepository comicArcoRepository;
    private final ComicTomoRepository comicTomoRepository;

    public ComicService(ComicRepository comicRepository, ComicPersonaRepository comicPersonaRepository, ComicPersonajeRepository comicPersonajeRepository, ComicEstiloRepository comicEstiloRepository, ComicArcoRepository comicArcoRepository, ComicTomoRepository comicTomoRepository) {
        this.comicRepository = comicRepository;
        this.comicPersonaRepository = comicPersonaRepository;
        this.comicPersonajeRepository = comicPersonajeRepository;
        this.comicEstiloRepository = comicEstiloRepository;
        this.comicArcoRepository = comicArcoRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    private List<PersonaConRolDto> getPersonasDeComic(Integer comicId) {
        return comicPersonaRepository.findByComicIdConPersona(comicId).stream()
                .map(cp -> new PersonaConRolDto(cp.getPersona().getNombre(), cp.getRol().name()))
                .toList();
    }

    private List<PersonajeResumenDto> getPersonajesDeComic(Integer comicId){
        return comicPersonajeRepository.findByComicIdConPersonaje(comicId).stream().
                map(cp -> new PersonajeResumenDto(cp.getPersonajeId(), cp.getPersonaje().getNombre()))
                .toList();
    }

    private List<EstiloResumenDto> getEstilosDeComic(Integer comicId){
        return comicEstiloRepository.findByComicIdConEstilo(comicId).stream()
                .map(cp -> new EstiloResumenDto(cp.getEstiloId(), cp.getEstilo().getNombre()))
                .toList();
    }

    private List<ArcoResumenDto> getArcosDeComic(Integer comicId){
        return comicArcoRepository.findByComicIdConArco(comicId).stream().
                map(ca -> new ArcoResumenDto(ca.getArcoId(), ca.getArco().getNombre())).toList();
    }

    private List<TomoResumenDto> getTomosDeComic(Integer comicId){
        return comicTomoRepository.findByComicIdConTomo(comicId).stream().
                map(cp -> new TomoResumenDto(cp.getTomoId(), cp.getTomo().getNombre(),
                        cp.getTomo().getEditorial(), cp.getTomo().getAnhoEdicion(), cp.getTomo().getCoverPath())).toList();
    }

    public List<ComicResumenDto> findAllConEtapa() {
        return comicRepository.findAllConEtapa().stream()
                .map(c -> new ComicResumenDto(
                        c.getId(),
                        c.getNombre(),
                        c.getNumero(),
                        c.getAnho(),
                        c.getRanking(),
                        c.getNotas(),
                        null, // orden no aplica aquí, solo tiene sentido dentro de un tomo
                        c.getCoverPath(),
                        c.getEtapa() != null
                                ? new EtapaResumenDto(c.getEtapa().getId(), c.getEtapa().getNombre())
                                : null
                ))
                .toList();
    }

    public ComicDetalleDto getComicDetalle(Integer comicId) {
        ComicEntity comic = comicRepository.findById(comicId).orElseThrow(() -> new NoSuchElementException("No se encontró el comic "+comicId));

        return new ComicDetalleDto(
                comic.getId(),comic.getNombre(),comic.getNumero(),comic.getAnho(),comic.getRanking(),comic.getNotas(),comic.getCoverPath(),
                comic.getEtapa() != null ? new EtapaResumenDto(comic.getEtapaId(), comic.getEtapa().getNombre()) : null,
                getPersonasDeComic(comicId),
                getPersonajesDeComic(comicId),
                getEstilosDeComic(comicId),
                getArcosDeComic(comicId),
                getTomosDeComic(comicId)
        );
    }



}
