
ALTER TABLE mi_etapa
    ADD COLUMN tipo ENUM('edad','era_editorial','autor') NOT NULL DEFAULT 'autor',
  ADD COLUMN serie_id INT NULL,
  ADD COLUMN num_desde INT NULL,
  ADD COLUMN num_hasta INT NULL,
  ADD COLUMN guionista VARCHAR(255) NULL,
  ADD CONSTRAINT fk_etapa_serie FOREIGN KEY (serie_id) REFERENCES gcd_series(id);

ALTER TABLE mi_arco_argumental
    ADD COLUMN nombre_original VARCHAR(255) NULL,
  ADD COLUMN tipo ENUM('arco','saga','evento','antologia','especial') NOT NULL DEFAULT 'arco',
  ADD COLUMN arco_padre_id INT NULL,
  ADD CONSTRAINT fk_arco_padre FOREIGN KEY (arco_padre_id) REFERENCES mi_arco_argumental(id);

CREATE TABLE mi_arco_rango (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               arco_id INT NOT NULL,
                               serie_id INT NOT NULL,
                               num_desde INT NOT NULL,
                               num_hasta INT NOT NULL,
                               FOREIGN KEY (arco_id) REFERENCES mi_arco_argumental(id) ON DELETE CASCADE,
                               FOREIGN KEY (serie_id) REFERENCES gcd_series(id)
);