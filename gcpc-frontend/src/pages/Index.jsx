import { useState, useEffect } from "react";
import { API_URL } from "../config.js";
import { Parrilla } from "../components/Parrilla.jsx";
import { TarjetaTomo } from "../components/TarjetaTomo.jsx";
import { TarjetaComic } from "../components/TarjetaComic.jsx";

function Index() {
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
        <div className="mt-6 space-y-8">
          <section>
            <h2 className="font-display text-xl text-text mb-3">Tomos</h2>
            <Parrilla
              items={resultadoTomos}
              keyExtractor={(tomo) => tomo.id}
              renderItem={(tomo) => <TarjetaTomo tomo={tomo} />}
              mensajeVacio={`No se ha encontrado "${busqueda}" entre tus tomos`}
            />
          </section>

          <section>
            <h2 className="font-display text-xl text-text mb-3">Cómics</h2>
            <Parrilla
              items={resultadoComics}
              keyExtractor={(comic) => comic.id}
              renderItem={(comic) => <TarjetaComic comic={comic} />}
              mensajeVacio={`No se ha encontrado "${busqueda}" entre tus cómics`}
            />
          </section>
        </div>
      )}

      <hr className="my-8 border-border" />

      <section>
        <h2 className="font-display text-xl text-text mb-3">Últimos tomos añadidos</h2>
        <Parrilla
          items={tomos.slice(0, 3)}
          keyExtractor={(tomo) => tomo.id}
          renderItem={(tomo) => <TarjetaTomo tomo={tomo} />}
          mensajeVacio="Todavía no tienes tomos en la colección"
        />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl text-text mb-3">Últimas grapas añadidas</h2>
        <Parrilla
          items={comics.slice(0, 3)}
          keyExtractor={(comic) => comic.id}
          renderItem={(comic) => <TarjetaComic comic={comic} />}
          mensajeVacio="Todavía no tienes grapas en la colección"
        />
      </section>
    </div>
  );
}

export { Index };
