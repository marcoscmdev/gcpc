-- Las etapas ahora se asignan en mi_comic_etapa (N:M) y sus rangos en mi_etapa_rango (V10).
-- Se eliminan las columnas del modelo antiguo (una etapa por comic y un unico rango en la etapa).
ALTER TABLE mi_comic DROP FOREIGN KEY fk_comic_etapa;
ALTER TABLE mi_comic DROP COLUMN etapa_id;

ALTER TABLE mi_etapa DROP FOREIGN KEY fk_etapa_serie;
ALTER TABLE mi_etapa
    DROP COLUMN serie_id,
    DROP COLUMN num_desde,
    DROP COLUMN num_hasta;
