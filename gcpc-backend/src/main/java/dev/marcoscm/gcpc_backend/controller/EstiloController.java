package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.service.EstiloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/estilos")
public class EstiloController {
    private final EstiloService estiloService;

    public EstiloController(EstiloService estiloService) {
        this.estiloService = estiloService;
    }

    @GetMapping("/buscar")
    public List<ComicConTomoDto> buscarPorNombre(@RequestParam String nombre){
        return estiloService.buscarComicsPorEstilo(nombre);
    }
}
