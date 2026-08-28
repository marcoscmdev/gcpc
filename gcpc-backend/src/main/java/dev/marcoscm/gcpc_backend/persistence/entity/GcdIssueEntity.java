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
@Table(name = "gcd_issue")
public class GcdIssueEntity {

    @Id
    private Integer id;

    @Column(nullable = false, length = 50)
    private String number;

    @Column(length = 255)
    private String title;

    @Column(name = "key_date", length = 10)
    private String keyDate;

    @Column(name = "series_id", nullable = false)
    private Integer seriesId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "series_id", insertable = false, updatable = false)
    private GcdSeriesEntity series;
}