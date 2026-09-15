import React from "react";
import { useState, useEffect } from "react";

function Inicio() {
  const [tomos, setTomos] = useState([]);
  const [comics, setComics] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const resultadoTomos = tomos.filter((tomo) =>
    tomo.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );
  const resultadoComics = comics.filter((comic) =>
    comic.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  useEffect(() => {
    fetch("http://localhost:8080/api/tomos")
      .then((response) => response.json())
      .then((data) => setTomos(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/comics")
      .then((response) => response.json())
      .then((data) => setComics(data));
  }, []);

  return (
    <div>
      <h1>Inicio</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {busqueda && (
  <>
    <h2>Tomos</h2>
    {resultadoTomos.length === 0 ? (
      <p>No se ha encontrado "{busqueda}" entre tus tomos</p>
    ) : (
      resultadoTomos.map(tomo => (
        <div key={tomo.id}>
          <h3>{tomo.nombre}</h3>
          {tomo.coverPath ? (
            <img src={tomo.coverPath} alt={tomo.nombre} />
          ) : (
            <p>Sin portada</p>
          )}
          <p>{tomo.editorial} — {tomo.anhoEdicion}</p>
        </div>
      ))
    )}

    <h2>Cómics</h2>
    {resultadoComics.length === 0 ? (
      <p>No se ha encontrado "{busqueda}" entre tus cómics</p>
    ) : (
      resultadoComics.map(comic => (
        <div key={comic.id}>
          <h3>{comic.nombre} #{comic.numero}</h3>
          {comic.coverPath ? (
            <img src={comic.coverPath} alt={comic.nombre} />
          ) : (
            <p>Sin portada</p>
          )}
          <p>Año {comic.anho}{comic.etapa ? ` — ${comic.etapa.nombre}` : ''}</p>
        </div>
      ))
    )}
  </>
)}

      <hr />
      <h3>Últimos tomos añadidos</h3>
      {tomos.slice(0, 3).map((tomo) => (
        <div key={tomo.id}>
          <h3>{tomo.nombre}</h3>
          {tomo.coverPath ? (
            <img src={tomo.coverPath} alt={tomo.nombre} />
          ) : (
            <p>Sin portada</p>
          )}
          <p>
            {tomo.editorial} — {tomo.anhoEdicion}
          </p>
        </div>
      ))}
    </div>
  );
}

export { Inicio };
