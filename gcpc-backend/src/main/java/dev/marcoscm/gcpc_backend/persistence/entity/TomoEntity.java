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
@Table(name = "mi_tomo")
public class TomoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String nombre;
    private String isbn;
    private String editorial;
    @Column(name = "anio_edicion", columnDefinition = "SMALLINT")
    private Integer anhoEdicion;

    @OneToMany(mappedBy = "tomo", fetch = FetchType.LAZY)
    private List<ComicTomoEntity> comicTomos;
}
