package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicEstiloRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.EstiloRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstiloService {
    private final ComicEstiloRepository comicEstiloRepository;
    private final EstiloRepository estiloRepository;
    private final ComicTomoRepository comicTomoRepository;

    public EstiloService(ComicEstiloRepository comicEstiloRepository, EstiloRepository estiloRepository, ComicTomoRepository comicTomoRepository) {
        this.comicEstiloRepository = comicEstiloRepository;
        this.estiloRepository = estiloRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    private ComicConTomoDto mapComicConTomo(ComicEntity comic) {
        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream().
                map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(), ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(),
                        ct.getTomo().getCoverPath())).toList();
        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), tomos);
    }

    public List<ComicConTomoDto> buscarComicsPorEstilo(String nombre){
        return comicEstiloRepository.findComicsByEstiloNombre(nombre).stream().map(this::mapComicConTomo).toList();
    }
}
