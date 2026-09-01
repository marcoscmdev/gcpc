package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicSearchResultDto;
import dev.marcoscm.gcpc_backend.service.GcdSearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gcd")
public class GcdSearchController {

    private final GcdSearchService gcdSearchService;

    public GcdSearchController(GcdSearchService gcdSearchService) {
        this.gcdSearchService = gcdSearchService;
    }

    @GetMapping("/buscar")
    public List<ComicSearchResultDto> buscar(@RequestParam String serie, @RequestParam(required = false) String numero) {
        return gcdSearchService.buscar(serie, numero);
    }
    @GetMapping("/buscar-rango")
    public List<ComicSearchResultDto>  buscarRango(@RequestParam String serie, @RequestParam Integer desde, @RequestParam Integer hasta) {
        return gcdSearchService.buscarporRango(serie, desde, hasta);
    }
}
