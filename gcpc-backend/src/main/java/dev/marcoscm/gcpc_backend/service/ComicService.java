package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.*;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.*;
import org.springframework.stereotype.Service;

import dev.marcoscm.gcpc_backend.persistence.entity.ComicTomoEntity;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ComicService {
    private final ComicRepository comicRepository;
    private final ComicPersonaRepository comicPersonaRepository;
    private final ComicPersonajeRepository comicPersonajeRepository;
    private final ComicEstiloRepository comicEstiloRepository;
    private final ComicArcoRepository comicArcoRepository;
    private final ComicTomoRepository comicTomoRepository;
    private final ComicEtapaRepository comicEtapaRepository;

    public ComicService(ComicRepository comicRepository, ComicPersonaRepository comicPersonaRepository, ComicPersonajeRepository comicPersonajeRepository, ComicEstiloRepository comicEstiloRepository, ComicArcoRepository comicArcoRepository, ComicTomoRepository comicTomoRepository, ComicEtapaRepository comicEtapaRepository) {
        this.comicRepository = comicRepository;
        this.comicPersonaRepository = comicPersonaRepository;
        this.comicPersonajeRepository = comicPersonajeRepository;
        this.comicEstiloRepository = comicEstiloRepository;
        this.comicArcoRepository = comicArcoRepository;
        this.comicTomoRepository = comicTomoRepository;
        this.comicEtapaRepository = comicEtapaRepository;
    }

    private List<PersonaConRolDto> getPersonasDeComic(Integer comicId) {
        return comicPersonaRepository.findByComicIdConPersona(comicId).stream()
                .map(cp -> new PersonaConRolDto(cp.getPersona().getNombre(), cp.getRol().name()))
                .toList();
    }

    private List<PersonajeResumenDto> getPersonajesDeComic(Integer comicId){
        return comicPersonajeRepository.findByComicIdConPersonaje(comicId).stream().
                map(cp -> new PersonajeResumenDto(cp.getPersonajeId(), cp.getPersonaje().getNombre(), cp.getPersonaje().getTipo(), cp.getPersonaje().getNombreReal(), cp.getPersonaje().getDescripcion()))
                .toList();
    }

    private List<EstiloResumenDto> getEstilosDeComic(Integer comicId){
        return comicEstiloRepository.findByComicIdConEstilo(comicId).stream()
                .map(cp -> new EstiloResumenDto(cp.getEstiloId(), cp.getEstilo().getNombre()))
                .toList();
    }

    private List<ArcoResumenDto> getArcosDeComic(Integer comicId){
        return comicArcoRepository.findByComicIdConArco(comicId).stream().
                map(ca -> new ArcoResumenDto(ca.getArcoId(), ca.getArco().getNombre(), ca.getArco().getNombreOriginal(), ca.getArco().getAnho(), ca.getArco().getTipo(), ca.getArco().getDescripcion())).toList();
    }

    private List<EtapaResumenDto> getEtapasDeComic(Integer comicId) {
        return comicEtapaRepository.findByComicIdConEtapa(comicId).stream()
                .map(ce -> new EtapaResumenDto(ce.getEtapaId(), ce.getEtapa().getNombre(), ce.getEtapa().getAnhoInicio(), ce.getEtapa().getAnhoFin(), ce.getEtapa().getTipo()))
                .toList();
    }

    private List<TomoResumenDto> getTomosDeComic(Integer comicId){
        return comicTomoRepository.findByComicIdConTomo(comicId).stream().
                map(cp -> new TomoResumenDto(cp.getTomoId(), cp.getTomo().getNombre(),
                        cp.getTomo().getEditorial(), cp.getTomo().getAnhoEdicion(), cp.getTomo().getCoverPath())).toList();
    }

    public List<ComicResumenDto> findAll() {
        java.util.Set<Integer> conTomo = comicTomoRepository.findAll().stream()
                .map(ComicTomoEntity::getComicId)
                .collect(Collectors.toSet());
        return comicRepository.findAll().stream()
                .map(c -> new ComicResumenDto(
                        c.getId(),
                        c.getNombre(),
                        c.getNumero(),
                        c.getAnho(),
                        c.getRanking(),
                        c.getNotas(),
                        null,
                        c.getCoverPath(),
                        getEtapasDeComic(c.getId()),
                        getPersonasDeComic(c.getId()),
                        !conTomo.contains(c.getId())
                ))
                .toList();
    }

    public ComicDetalleDto getComicDetalle(Integer comicId) {
        ComicEntity comic = comicRepository.findById(comicId).orElseThrow(() -> new NoSuchElementException("No se encontró el comic "+comicId));

        return new ComicDetalleDto(
                comic.getId(),comic.getNombre(),comic.getNumero(),comic.getAnho(),comic.getRanking(),comic.getNotas(),comic.getCoverPath(),
                getEtapasDeComic(comicId),
                getPersonasDeComic(comicId),
                getPersonajesDeComic(comicId),
                getEstilosDeComic(comicId),
                getArcosDeComic(comicId),
                getTomosDeComic(comicId)
        );
    }

    /**
     * Comics que estan en 2 o mas tomos. Se agrupa por gcd_issue_id (aunque haya varias filas de mi_comic
     * para el mismo numero) y, si no tiene, por nombre + numero + anio.
     */
    public List<ComicConTomoDto> getDuplicados() {
        Map<String, List<ComicTomoEntity>> grupos = comicTomoRepository.findAllConComicYTomo().stream()
                .collect(Collectors.groupingBy(ct -> claveDuplicado(ct.getComic()), LinkedHashMap::new, Collectors.toList()));

        return grupos.values().stream()
                .map(lista -> {
                    Map<Integer, TomoResumenDto> tomos = new LinkedHashMap<>();
                    lista.stream().sorted(Comparator.comparing(ComicTomoEntity::getTomoId)).forEach(ct ->
                            tomos.putIfAbsent(ct.getTomoId(), new TomoResumenDto(ct.getTomoId(), ct.getTomo().getNombre(),
                                    ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(), ct.getTomo().getCoverPath())));
                    var c = lista.get(0).getComic();
                    return new ComicConTomoDto(c.getId(), c.getNombre(), c.getNumero(), c.getAnho(), c.getCoverPath(),
                            List.of(), List.copyOf(tomos.values()));
                })
                .filter(dto -> dto.tomos().size() > 1)
                .sorted(Comparator.comparing(ComicConTomoDto::nombre, String.CASE_INSENSITIVE_ORDER)
                        .thenComparing(dto -> numeroOrden(dto.numero())))
                .toList();
    }

    private static String claveDuplicado(ComicEntity c) {
        if (c.getGcdIssueId() != null) return "g" + c.getGcdIssueId();
        return "n" + c.getNombre().toLowerCase() + "|" + c.getNumero() + "|" + c.getAnho();
    }

    private static int numeroOrden(String numero) {
        try {
            return Integer.parseInt(numero.replaceAll("\\D.*$", ""));
        } catch (Exception e) {
            return Integer.MAX_VALUE;
        }
    }
}
