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
@Table(name = "mi_comic_persona")
@IdClass(ComicPersonaId.class)
public class ComicPersonaEntity {
    @Column(name = "comic_id")
    @Id
    private Integer comicId;
    @Column(name = "persona_id")
    @Id
    private Integer personaId;
    @Id
    @Enumerated(EnumType.STRING)
    private RolEnum rol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicEntity comic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "persona_id", insertable = false, updatable = false)
    private PersonaEntity persona;
}
