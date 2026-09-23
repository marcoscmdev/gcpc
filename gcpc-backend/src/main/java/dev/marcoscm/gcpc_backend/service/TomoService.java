package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ArcoResumenDto;
import dev.marcoscm.gcpc_backend.dto.ComicDeTomoDto;
import dev.marcoscm.gcpc_backend.dto.EstiloResumenDto;
import dev.marcoscm.gcpc_backend.dto.EtapaResumenDto;
import dev.marcoscm.gcpc_backend.dto.PersonaConRolDto;
import dev.marcoscm.gcpc_backend.dto.PersonajeResumenDto;
import dev.marcoscm.gcpc_backend.dto.TomoDetalleDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.TomoEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicArcoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicEstiloRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicPersonajeRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicPersonaRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.TomoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TomoService {
    private final ComicRepository comicRepository;
    private final TomoRepository tomoRepository;
    private final ComicTomoRepository comicTomoRepository;
    private final ComicPersonaRepository comicPersonaRepository;
    private final ComicPersonajeRepository comicPersonajeRepository;
    private final ComicEstiloRepository comicEstiloRepository;
    private final ComicArcoRepository comicArcoRepository;

    public TomoService(ComicRepository comicRepository, TomoRepository tomoRepository,
                       ComicTomoRepository comicTomoRepository, ComicPersonaRepository comicPersonaRepository,
                       ComicPersonajeRepository comicPersonajeRepository, ComicEstiloRepository comicEstiloRepository,
                       ComicArcoRepository comicArcoRepository) {
        this.comicRepository = comicRepository;
        this.tomoRepository = tomoRepository;
        this.comicTomoRepository = comicTomoRepository;
        this.comicPersonaRepository = comicPersonaRepository;
        this.comicPersonajeRepository = comicPersonajeRepository;
        this.comicEstiloRepository = comicEstiloRepository;
        this.comicArcoRepository = comicArcoRepository;
    }

    private List<PersonaConRolDto> getPersonasDeComic(Integer comicId) {
        return comicPersonaRepository.findByComicIdConPersona(comicId).stream()
                .map(cp -> new PersonaConRolDto(cp.getPersona().getNombre(), cp.getRol().name()))
                .toList();
    }

    private List<PersonajeResumenDto> getPersonajesDeComic(Integer comicId) {
        return comicPersonajeRepository.findByComicIdConPersonaje(comicId).stream()
                .map(cp -> new PersonajeResumenDto(cp.getPersonajeId(), cp.getPersonaje().getNombre()))
                .toList();
    }

    private List<EstiloResumenDto> getEstilosDeComic(Integer comicId) {
        return comicEstiloRepository.findByComicIdConEstilo(comicId).stream()
                .map(cp -> new EstiloResumenDto(cp.getEstiloId(), cp.getEstilo().getNombre()))
                .toList();
    }

    private List<ArcoResumenDto> getArcosDeComic(Integer comicId) {
        return comicArcoRepository.findByComicIdConArco(comicId).stream()
                .map(ca -> new ArcoResumenDto(ca.getArcoId(), ca.getArco().getNombre()))
                .toList();
    }

    public List<TomoResumenDto> getAll() {
        return tomoRepository.findAll()
                .stream()
                .map(t -> new TomoResumenDto(
                        t.getId(), t.getNombre(), t.getEditorial(), t.getAnhoEdicion(), t.getCoverPath()
                ))
                .toList();
    }

    public TomoDetalleDto getTomoConComics(Integer tomoId) {
        TomoEntity tomo = tomoRepository.findById(tomoId).orElseThrow(() -> new NoSuchElementException("No se encontró tomo " + tomoId));

        List<ComicDeTomoDto> comics = comicTomoRepository.findByTomoIdOrdenado(tomoId).stream().map(
                ct -> new ComicDeTomoDto(
                        ct.getComic().getId(),
                        ct.getComic().getNombre(),
                        ct.getComic().getNumero(),
                        ct.getComic().getAnho(),
                        ct.getComic().getRanking(),
                        ct.getComic().getNotas(),
                        ct.getOrden(),
                        ct.getComic().getCoverPath(),
                        ct.getComic().getEtapa() != null
                                ? new EtapaResumenDto(ct.getComic().getEtapa().getId(), ct.getComic().getEtapa().getNombre())
                                : null,
                        getPersonasDeComic(ct.getComic().getId()),
                        getPersonajesDeComic(ct.getComic().getId()),
                        getEstilosDeComic(ct.getComic().getId()),
                        getArcosDeComic(ct.getComic().getId())
                )).toList();

        return new TomoDetalleDto(
                tomo.getId(), tomo.getNombre(), tomo.getIsbn(),
                tomo.getEditorial(), tomo.getAnhoEdicion(),
                tomo.getCoverPath(),
                comics,
                tomo.getRanking(),
                tomo.getNotas(),
                tomo.getCuriosidades()
        );
    }

    public List<TomoResumenDto> buscarPorCuriosidades(String texto) {
        return tomoRepository.buscarPorCuriosidades(texto).stream()
                .map(t -> new TomoResumenDto(
                        t.getId(), t.getNombre(), t.getEditorial(), t.getAnhoEdicion(), t.getCoverPath()
                ))
                .toList();
    }
}
