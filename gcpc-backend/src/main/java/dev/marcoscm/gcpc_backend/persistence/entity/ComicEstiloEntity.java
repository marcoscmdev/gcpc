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
@Table(name = "mi_comic_estilo")
@IdClass(ComicEstiloId.class)
public class ComicEstiloEntity {
    @Id
    @Column(name = "comic_id")
    private Integer comicId;

    @Id
    @Column(name = "estilo_id")
    private Integer estiloId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estilo_id", insertable = false, updatable = false)
    private EstiloEntity estilo;

}
