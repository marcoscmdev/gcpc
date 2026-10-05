CREATE TABLE mi_etapa_rango (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                etapa_id INT NOT NULL,
                                serie_id INT NOT NULL,
                                num_desde INT NOT NULL,
                                num_hasta INT NOT NULL,
                                FOREIGN KEY (etapa_id) REFERENCES mi_etapa(id) ON DELETE CASCADE,
                                FOREIGN KEY (serie_id) REFERENCES gcd_series(id)
);

CREATE TABLE mi_comic_etapa (
                                comic_id INT NOT NULL,
                                etapa_id INT NOT NULL,
                                PRIMARY KEY (comic_id, etapa_id),
                                FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                                FOREIGN KEY (etapa_id) REFERENCES mi_etapa(id) ON DELETE CASCADE
);