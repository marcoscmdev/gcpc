package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ArcoResumenDto;
import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.persistence.entity.ArcoArgumentalEntity;
import dev.marcoscm.gcpc_backend.service.ArcoArgumentalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/arcos-argumentales")
public class ArcoArgumentalController {
    private final ArcoArgumentalService arcoArgumentalService;

    public ArcoArgumentalController(ArcoArgumentalService arcoArgumentalService) {
        this.arcoArgumentalService = arcoArgumentalService;
    }

    @GetMapping
    public List<ArcoResumenDto> findAll() {
        return arcoArgumentalService.getAll();
    }

    @GetMapping("/{id}/comics")
    public List<ComicConTomoDto> buscarComicsPorArco(@PathVariable Integer id) {
        return arcoArgumentalService.buscarComicsPorArco(id);
    }

}
