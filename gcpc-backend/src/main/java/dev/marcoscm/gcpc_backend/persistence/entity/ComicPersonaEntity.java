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
    @Id
    // FK de mi_comic
    private Integer comicId;
    @Id
    // FK de mi_persona
    private Integer personaId;
    @Id
    @Enumerated(EnumType.STRING)
    private RolEnum rol;

}
