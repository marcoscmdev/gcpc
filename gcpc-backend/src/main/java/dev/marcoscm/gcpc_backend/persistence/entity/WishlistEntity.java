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
@Table(name = "mi_wishlist")
public class WishlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "gcd_issue_id")
    private Integer gcdIssueId;

    @Column(nullable = false)
    private String serie;

    @Column(length = 50)
    private String numero;

    private String titulo;

    @Column(columnDefinition = "SMALLINT")
    private Integer anio;

    @Column(columnDefinition = "TEXT")
    private String notas;
}
