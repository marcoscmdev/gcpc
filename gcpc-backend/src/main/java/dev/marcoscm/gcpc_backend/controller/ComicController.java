package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicDetalleDto;
import dev.marcoscm.gcpc_backend.dto.ComicResumenDto;
import dev.marcoscm.gcpc_backend.service.ComicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/comics")
public class ComicController {

    private final ComicService comicService;

    public ComicController(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping
    public List<ComicResumenDto> getAll() {
        return comicService.findAllConEtapa();
    }

    @GetMapping("/{idComic}")
    public ComicDetalleDto getComicDetalle(@PathVariable Integer idComic) {
        return comicService.getComicDetalle(idComic);
    }
}
