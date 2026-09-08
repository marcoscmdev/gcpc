package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ArcoArgumentalEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ArcoArgumentalRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicArcoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArcoArgumentalService {
    private final ArcoArgumentalRepository arcoArgumentalRepository;
    private final ComicArcoRepository comicArcoRepository;
    private final ComicTomoRepository comicTomoRepository;

    public ArcoArgumentalService(ArcoArgumentalRepository arcoArgumentalRepository,
                                 ComicArcoRepository comicArcoRepository, ComicTomoRepository comicTomoRepository) {
        this.arcoArgumentalRepository = arcoArgumentalRepository;
        this.comicArcoRepository = comicArcoRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    public List<ArcoArgumentalEntity> getAll() {
        return arcoArgumentalRepository.findAll();
    }

    public List<ComicEntity> getComicsDeArco(Integer arcoId) {
        return comicArcoRepository.findByArco_Id(arcoId)
                .stream()
                .map(ComicArcoEntity::getComic)
                .toList();
    }

    private ComicConTomoDto mapComicConTomo(ComicEntity comic) {
        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream().
                map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(), ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(),
                        ct.getTomo().getCoverPath())).toList();
        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), tomos);
    }

    public List<ComicConTomoDto> buscarComicsPorArco(String nombre) {
        return comicArcoRepository.findByArcoNombreConComic(nombre).stream()
                .map(ca -> mapComicConTomo(ca.getComic()))
                .toList();
    }

}
