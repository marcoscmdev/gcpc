package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicResumenDto;
import dev.marcoscm.gcpc_backend.dto.EtapaResumenDto;
import dev.marcoscm.gcpc_backend.dto.TomoDetalleDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.TomoEntity;
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


    public TomoService(ComicRepository comicRepository, TomoRepository tomoRepository,
                       ComicTomoRepository comicTomoRepository) {
        this.comicRepository = comicRepository;
        this.tomoRepository = tomoRepository;
        this.comicTomoRepository = comicTomoRepository;
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

        List<ComicResumenDto> comics = comicTomoRepository.findByTomoIdOrdenado(tomoId).stream().map(
                ct -> new ComicResumenDto(
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
                                : null
                )).toList();

        return new TomoDetalleDto(
                tomo.getId(), tomo.getNombre(), tomo.getIsbn(),
                tomo.getEditorial(), tomo.getAnhoEdicion(),
                tomo.getCoverPath(),
                comics
        );
    }


}
