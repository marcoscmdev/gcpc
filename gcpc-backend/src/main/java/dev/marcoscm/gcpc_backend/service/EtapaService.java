package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicTomoRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.EtapaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtapaService {

    private final EtapaRepository etapaRepository;
    private final ComicTomoRepository comicTomoRepository;

    public EtapaService(EtapaRepository etapaRepository, ComicTomoRepository comicTomoRepository) {
        this.etapaRepository = etapaRepository;
        this.comicTomoRepository = comicTomoRepository;
    }

    private ComicConTomoDto mapComicConTomo(ComicEntity comic) {
        List<TomoResumenDto> tomos = comicTomoRepository.findByComicIdConTomo(comic.getId()).stream().
                map(ct -> new TomoResumenDto(
                        ct.getTomo().getId(), ct.getTomo().getNombre(), ct.getTomo().getEditorial(), ct.getTomo().getAnhoEdicion(),
                        ct.getTomo().getCoverPath())).toList();
        return new ComicConTomoDto(comic.getId(), comic.getNombre(), comic.getNumero(), comic.getAnho(), comic.getCoverPath(), tomos);
    }

    public List<ComicConTomoDto> buscarComicsPorEtapa(String nombre){
        return etapaRepository.findByEtapaNombreConEtapa(nombre).stream().map(this::mapComicConTomo).toList();
    }


}
