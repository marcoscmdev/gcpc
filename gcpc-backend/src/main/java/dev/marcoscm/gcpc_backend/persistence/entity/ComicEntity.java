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
    @Column(name = "cover_path")
    private String coverPath;

    @Column(name = "gcd_issue_id")
    private Integer gcdIssueId;

    @Column(name = "etapa_id")
    private Integer etapaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etapa_id", insertable = false, updatable = false)
    private EtapaEntity etapa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gcd_issue_id", insertable = false, updatable = false)
    private GcdIssueEntity gcdIssue;

    @OneToMany(mappedBy = "comic", fetch = FetchType.LAZY)
    private List<ComicPersonajeEntity> comicPersonajes;
}
