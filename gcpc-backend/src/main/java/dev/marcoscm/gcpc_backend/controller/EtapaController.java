package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.service.EtapaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/etapas")
public class EtapaController {

    private final EtapaService etapaService;


    public EtapaController(EtapaService etapaService) {
        this.etapaService = etapaService;
    }

    @GetMapping("/buscar")
    public List<ComicConTomoDto> buscarComicsPorEtapa(@RequestParam String nombre){
        return etapaService.buscarComicsPorEtapa(nombre);
    }
}
