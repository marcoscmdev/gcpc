package dev.marcoscm.gcpc_backend.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComicPersonaId implements Serializable {
    private Integer comicId;
    private Integer personaId;
    private RolEnum rol;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComicPersonaId that = (ComicPersonaId) o;
        return Objects.equals(comicId, that.comicId) && Objects.equals(personaId, that.personaId) && rol == that.rol;
    }

    @Override
    public int hashCode() {
        return Objects.hash(comicId, personaId, rol);
    }
}
