package dev.marcoscm.gcpc_backend.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mi_etapa")
public class EtapaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String nombre;
    @Column(name = "anio_inicio",  nullable = false, columnDefinition = "SMALLINT")
    private Integer anhoInicio;
    @Column(name = "anio_fin", columnDefinition = "SMALLINT")
    private Integer anhoFin;

}
