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
@Table(name = "mi_comic_arco")
@IdClass(ComicArcoId.class)
public class ComicArcoEntity {
    @Id
    @Column(name = "comic_id" )
    private Integer comicId;
    @Id
    @Column(name = "arco_id" )
    private Integer arcoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arco_id", insertable = false, updatable = false)
    private ArcoArgumentalEntity arco;

}
