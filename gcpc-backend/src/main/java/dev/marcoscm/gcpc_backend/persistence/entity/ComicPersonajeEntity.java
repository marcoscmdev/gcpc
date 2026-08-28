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
@Table(name = "mi_comic_personaje")
@IdClass(ComicPersonajeId.class)
public class ComicPersonajeEntity {
    @Id
    @Column(name = "comic_id")
    private Integer comicId;
    @Id
    @Column(name = "personaje_id")
    private Integer personajeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personaje_id", insertable = false, updatable = false)
    private PersonajeEntity personaje;

}
