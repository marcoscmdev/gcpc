package dev.marcoscm.gcpc_backend.service;

import dev.marcoscm.gcpc_backend.dto.WishlistItemDto;
import dev.marcoscm.gcpc_backend.persistence.entity.WishlistEntity;
import dev.marcoscm.gcpc_backend.persistence.repository.ComicRepository;
import dev.marcoscm.gcpc_backend.persistence.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final ComicRepository comicRepository;

    public WishlistService(WishlistRepository wishlistRepository, ComicRepository comicRepository) {
        this.wishlistRepository = wishlistRepository;
        this.comicRepository = comicRepository;
    }

    private WishlistItemDto toDto(WishlistEntity w) {
        boolean loTengo = w.getGcdIssueId() != null && !comicRepository.findByGcdIssueId(w.getGcdIssueId()).isEmpty();
        return new WishlistItemDto(w.getId(), w.getGcdIssueId(), w.getSerie(), w.getNumero(), w.getTitulo(), w.getAnio(), w.getNotas(), loTengo);
    }

    public List<WishlistItemDto> getAll() {
        return wishlistRepository.findAll().stream()
                .sorted(Comparator.comparing(WishlistEntity::getSerie, String.CASE_INSENSITIVE_ORDER)
                        .thenComparing(w -> numeroOrden(w.getNumero()))
                        .thenComparing(WishlistEntity::getId))
                .map(this::toDto)
                .toList();
    }

    private static int numeroOrden(String numero) {
        try {
            return Integer.parseInt(numero.replaceAll("\\D.*$", ""));
        } catch (Exception e) {
            return Integer.MAX_VALUE;
        }
    }
}
