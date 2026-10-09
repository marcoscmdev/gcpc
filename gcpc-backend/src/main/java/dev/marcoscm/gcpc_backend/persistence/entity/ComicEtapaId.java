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
public class ComicEtapaId implements Serializable {
    private Integer comicId;
    private Integer etapaId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComicEtapaId that = (ComicEtapaId) o;
        return Objects.equals(comicId, that.comicId) && Objects.equals(etapaId, that.etapaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comicId, etapaId);
    }
}
