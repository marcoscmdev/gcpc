package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.ComicSearchResultDto;
import dev.marcoscm.gcpc_backend.dto.EtapaResumenDto;
import dev.marcoscm.gcpc_backend.dto.PersonajeResumenDto;
import dev.marcoscm.gcpc_backend.service.EtapaService;
import dev.marcoscm.gcpc_backend.service.GcdSearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/etapas")
public class EtapaController {

    private final EtapaService etapaService;
    private final GcdSearchService gcdSearchService;


    public EtapaController(EtapaService etapaService, GcdSearchService gcdSearchService) {
        this.etapaService = etapaService;
        this.gcdSearchService = gcdSearchService;
    }

    @GetMapping("/{id}/gcd")
    public List<ComicSearchResultDto> buscarGcdPorEtapa(@PathVariable Integer id){
        return gcdSearchService.buscarPorEtapa(id);
    }

    @GetMapping("/{id}/comics")
    public List<ComicConTomoDto> buscarComicsPorEtapa(@PathVariable Integer id){
        return etapaService.buscarComicsPorEtapa(id);
    }

    @GetMapping
    public List<EtapaResumenDto> getAllEtapas(){
        return etapaService.getAll();
    }

}
