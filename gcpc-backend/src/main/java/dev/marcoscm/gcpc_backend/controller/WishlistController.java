package dev.marcoscm.gcpc_backend.controller;

import dev.marcoscm.gcpc_backend.dto.WishlistItemDto;
import dev.marcoscm.gcpc_backend.service.WishlistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistItemDto> getAll() {
        return wishlistService.getAll();
    }
}
