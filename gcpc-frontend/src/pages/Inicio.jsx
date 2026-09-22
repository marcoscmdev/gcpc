import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../config.js";

function Inicio() {
  const [tomos, setTomos] = useState([]);
  const [comics, setComics] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [cargandoTomos, setCargandoTomos] = useState(true);
  const [cargandoComics, setCargandoComics] = useState(true);
  const [error, setError] = useState(null);

  function manejarRespuesta(response) {
    if (!response.ok) {
      return response.json()
        .catch(() => ({}))
        .then((body) => {
          throw { codigo: response.status, mensaje: body.message || body.error || "Error desconocido" };
        });
    }
    return response.json();
  }

  const resultadoTomos = tomos.filter((tomo) =>
    tomo.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );
  const resultadoComics = comics.filter((comic) =>
    comic.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  useEffect(() => {
    fetch(`${API_URL}/api/tomos`)
      .then(manejarRespuesta)
      .then((data) => setTomos(data))
      .catch((err) => setError(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargandoTomos(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/comics`)
      .then(manejarRespuesta)
      .then((data) => setComics(data))
      .catch((err) => setError(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargandoComics(false));
  }, []);

  return (
    <div>
      <h1>Inicio</h1>

      {(cargandoTomos || cargandoComics) && <h4>Cargando...</h4>}

      {error && (
        <div>
          <h2>Error</h2>
          <p>Código: {error.codigo}</p>
          <p>{error.mensaje}</p>
        </div>
      )}
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
            <img src= "/img/portada-generica.jpg" alt="Sin portada" />
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
            <img src= "/img/portada-generica.jpg" alt="Sin portada" />
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
            <img src= "/img/portada-generica.jpg" alt="Sin portada" />
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
