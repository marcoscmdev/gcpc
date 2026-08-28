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
public class ComicPersonajeId implements Serializable {

    private Integer comicId;
    private Integer personajeId;

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComicPersonajeId that = (ComicPersonajeId) o;
        return Objects.equals(comicId, that.comicId) && Objects.equals(personajeId, that.personajeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comicId, personajeId);
    }
}
