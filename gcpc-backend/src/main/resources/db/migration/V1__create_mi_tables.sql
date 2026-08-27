CREATE TABLE mi_persona (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(255) NOT NULL,
                            localidad VARCHAR(255)
);

CREATE TABLE mi_personaje (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              nombre VARCHAR(255) NOT NULL,
                              tipo ENUM('heroe', 'villano', 'antiheroe', 'otro') NOT NULL,
                              gcd_character_id INT NULL,
                              FOREIGN KEY (gcd_character_id) REFERENCES gcd_character(id)
);

CREATE TABLE mi_etapa (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          anio_inicio SMALLINT NOT NULL,
                          anio_fin SMALLINT
);

CREATE TABLE mi_estilo (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE mi_arco_argumental (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE mi_tomo (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         nombre VARCHAR(255) NOT NULL,
                         isbn VARCHAR(20),
                         editorial VARCHAR(255),
                         anio_edicion SMALLINT
);

CREATE TABLE mi_comic (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          gcd_issue_id INT NULL,
                          nombre VARCHAR(255),
                          numero VARCHAR(50),
                          anio SMALLINT,
                          ranking TINYINT,
                          notas TEXT,
                          FOREIGN KEY (gcd_issue_id) REFERENCES gcd_issue(id)
);

CREATE TABLE mi_comic_persona (
                                  comic_id INT NOT NULL,
                                  persona_id INT NOT NULL,
                                  rol ENUM('guion', 'dibujo', 'color', 'entintado', 'rotulacion', 'otro') NOT NULL,
                                  PRIMARY KEY (comic_id, persona_id, rol),
                                  FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                                  FOREIGN KEY (persona_id) REFERENCES mi_persona(id) ON DELETE CASCADE
);

CREATE TABLE mi_comic_personaje (
                                    comic_id INT NOT NULL,
                                    personaje_id INT NOT NULL,
                                    PRIMARY KEY (comic_id, personaje_id),
                                    FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                                    FOREIGN KEY (personaje_id) REFERENCES mi_personaje(id) ON DELETE CASCADE
);

CREATE TABLE mi_comic_estilo (
                                 comic_id INT NOT NULL,
                                 estilo_id INT NOT NULL,
                                 PRIMARY KEY (comic_id, estilo_id),
                                 FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                                 FOREIGN KEY (estilo_id) REFERENCES mi_estilo(id) ON DELETE CASCADE
);

CREATE TABLE mi_comic_arco (
                               comic_id INT NOT NULL,
                               arco_id INT NOT NULL,
                               PRIMARY KEY (comic_id, arco_id),
                               FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                               FOREIGN KEY (arco_id) REFERENCES mi_arco_argumental(id) ON DELETE CASCADE
);

CREATE TABLE mi_comic_tomo (
                               comic_id INT NOT NULL,
                               tomo_id INT NOT NULL,
                               orden INT,
                               PRIMARY KEY (comic_id, tomo_id),
                               FOREIGN KEY (comic_id) REFERENCES mi_comic(id) ON DELETE CASCADE,
                               FOREIGN KEY (tomo_id) REFERENCES mi_tomo(id) ON DELETE CASCADE
);