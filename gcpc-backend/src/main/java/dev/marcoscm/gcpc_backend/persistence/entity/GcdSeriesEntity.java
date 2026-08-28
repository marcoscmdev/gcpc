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
@Table(name = "gcd_series")
public class GcdSeriesEntity {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "year_began")
    private Integer yearBegan;

    @Column(name = "year_ended")
    private Integer yearEnded;

    @Column(name = "publisher_id")
    private Integer publisherId;
}