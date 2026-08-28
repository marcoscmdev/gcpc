package dev.marcoscm.gcpc_backend.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mi_personaje")
public class PersonajeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoPersonaje tipo;

    private Integer gcdCharacterId;

    @OneToMany(mappedBy = "personaje", fetch = FetchType.LAZY)
    private List<ComicPersonajeEntity> comicPersonajes;
}
