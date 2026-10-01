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
@Table(name = "mi_arco_argumental")
public class ArcoArgumentalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "SMALLINT")
    private Integer anho;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "nombre_original")
    private String nombreOriginal;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoArco tipo;

    @OneToMany(mappedBy = "arco", fetch = FetchType.LAZY)
    private List<ComicArcoEntity> comicArcos;
}
