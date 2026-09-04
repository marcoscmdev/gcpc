ALTER TABLE mi_comic ADD COLUMN etapa_id INT NULL;
ALTER TABLE mi_comic ADD CONSTRAINT fk_comic_etapa FOREIGN KEY (etapa_id) REFERENCES mi_etapa(id);