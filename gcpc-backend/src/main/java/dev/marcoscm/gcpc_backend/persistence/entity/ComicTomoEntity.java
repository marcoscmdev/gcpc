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
@Table(name = "mi_comic_tomo")
@IdClass(ComicTomoId.class)

public class ComicTomoEntity {
    @Id
    @Column(name = "comic_id" )
    private Integer comicId;
    @Id
    @Column(name = "tomo_id")
    private Integer tomoId;

    private Integer orden;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tomo_id", insertable = false, updatable = false)
    private TomoEntity tomo;

}
