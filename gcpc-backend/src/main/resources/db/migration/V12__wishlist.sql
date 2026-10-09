-- Comics que quiero conseguir. gcd_issue_id es opcional (se rellena al anadir desde la busqueda GCD).
CREATE TABLE mi_wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gcd_issue_id INT NULL,
    serie VARCHAR(255) NOT NULL,
    numero VARCHAR(50) NULL,
    titulo VARCHAR(255) NULL,
    anio SMALLINT NULL,
    notas TEXT NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_wishlist_gcd_issue (gcd_issue_id)
);
