package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.ComicConTomoDto;
import dev.marcoscm.gcpc_backend.dto.PersonaConRolDto;
import dev.marcoscm.gcpc_backend.dto.PersonaResumenDto;
import dev.marcoscm.gcpc_backend.persistence.entity.RolEnum;
import dev.marcoscm.gcpc_backend.service.PersonaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {
    private final PersonaService personaService;

    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping("/buscar")
    public List<ComicConTomoDto> buscarPorNombre(@RequestParam String nombre,
                                                 @RequestParam(required = false) List<RolEnum> roles) {
        return personaService.buscarComicsPorPersona(nombre, roles);
    }
    @GetMapping
    public List<PersonaResumenDto> getAllPersonas(){
        return personaService.getAllPersonas();
    }

}
