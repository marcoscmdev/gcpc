package dev.marcoscm.gcpc_backend.controller;


import dev.marcoscm.gcpc_backend.dto.TomoDetalleDto;
import dev.marcoscm.gcpc_backend.dto.TomoResumenDto;
import dev.marcoscm.gcpc_backend.service.TomoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/tomos")
public class TomoController {

private final TomoService tomoService;


    public TomoController(TomoService tomoService) {
        this.tomoService = tomoService;
    }

    @GetMapping
    public List<TomoResumenDto> getAll() {
        return tomoService.getAll();
    }

    @GetMapping("/{id}")
    public TomoDetalleDto getTomoConComics(@PathVariable Integer id) {
        return tomoService.getTomoConComics(id);
    }



}
