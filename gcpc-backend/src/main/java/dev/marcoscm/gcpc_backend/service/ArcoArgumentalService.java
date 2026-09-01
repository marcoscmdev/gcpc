package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.persistence.entity.ArcoArgumentalEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicArcoEntity;
import dev.marcoscm.gcpc_backend.persistence.entity.ComicEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ArcoArgumentalRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicArcoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArcoArgumentalService {
    private final ArcoArgumentalRepository arcoArgumentalRepository;
    private final ComicArcoRepository comicArcoRepository;

    public ArcoArgumentalService(ArcoArgumentalRepository arcoArgumentalRepository,
                                 ComicArcoRepository comicArcoRepository) {
        this.arcoArgumentalRepository = arcoArgumentalRepository;
        this.comicArcoRepository = comicArcoRepository;
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

}
