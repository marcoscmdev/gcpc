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
public class ComicEstiloId implements Serializable {

    private Integer comicId;
    private Integer estiloId;

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComicEstiloId that = (ComicEstiloId) o;
        return Objects.equals(comicId, that.comicId) && Objects.equals(estiloId, that.estiloId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comicId, estiloId);
    }
}