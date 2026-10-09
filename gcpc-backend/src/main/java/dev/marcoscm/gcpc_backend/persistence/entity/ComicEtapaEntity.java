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
@Table(name = "mi_comic_etapa")
@IdClass(ComicEtapaId.class)
public class ComicEtapaEntity {
    @Id
    @Column(name = "comic_id")
    private Integer comicId;
    @Id
    @Column(name = "etapa_id")
    private Integer etapaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etapa_id", insertable = false, updatable = false)
    private EtapaEntity etapa;
}
