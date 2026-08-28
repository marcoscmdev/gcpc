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
@Table(name = "mi_comic")
public class ComicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String nombre;
    @Column(length = 50)
    private String numero;
    @Column(name = "anio", columnDefinition = "SMALLINT")
    private Integer anho;
    @Column(columnDefinition = "TINYINT")
    private Integer ranking;
    @Column(columnDefinition = "TEXT")
    private String notas;

    //FK con gcd_issue
    @Column(nullable = true)
    private Integer gcdIssueId;
}
