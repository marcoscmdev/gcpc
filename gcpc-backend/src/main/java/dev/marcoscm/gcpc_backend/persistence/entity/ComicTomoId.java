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
public class ComicTomoId implements Serializable {
    private Integer comicId;
    private Integer tomoId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComicTomoId that = (ComicTomoId) o;
        return Objects.equals(comicId, that.comicId) && Objects.equals(tomoId, that.tomoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comicId, tomoId);
    }
}
