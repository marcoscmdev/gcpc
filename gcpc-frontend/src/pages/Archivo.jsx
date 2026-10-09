import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config.js";
import { TituloPagina } from "../components/TituloPagina.jsx";
import { Panel } from "../components/Panel.jsx";
import { Campo } from "../components/Campo.jsx";
import { Boton } from "../components/Boton.jsx";
import { Etiqueta } from "../components/Etiqueta.jsx";

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

function estadoComic(comic) {
  if (comic.loTengo) return { texto: "Lo tengo", tono: "success" };
  if (comic.noBusco) return { texto: "No busco", tono: "neutral" };
  return { texto: "No lo tengo", tono: "danger" };
}

function Archivo() {
  const [serie, setSerie] = useState("");
  const [numero, setNumero] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [textoCuriosidad, setTextoCuriosidad] = useState("");
  const [resultadosCuriosidad, setResultadosCuriosidad] = useState([]);
  const [buscadoCuriosidad, setBuscadoCuriosidad] = useState(false);
  const [cargandoCuriosidad, setCargandoCuriosidad] = useState(false);
  const [errorCuriosidad, setErrorCuriosidad] = useState(null);

  const [duplicados, setDuplicados] = useState([]);
  const [buscadoDuplicados, setBuscadoDuplicados] = useState(false);
  const [cargandoDuplicados, setCargandoDuplicados] = useState(false);
  const [errorDuplicados, setErrorDuplicados] = useState(null);

  const [mostrarWishlist, setMostrarWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cargandoWishlist, setCargandoWishlist] = useState(false);
  const [errorWishlist, setErrorWishlist] = useState(null);

  function cerrarResultados() {
    setBuscado(false);
    setBuscadoCuriosidad(false);
    setBuscadoDuplicados(false);
    setMostrarWishlist(false);
  }

  function cargarWishlist() {
    cerrarResultados();
    setCargandoWishlist(true);
    setErrorWishlist(null);
    return fetch(`${API_URL}/api/wishlist`)
      .then(manejarRespuesta)
      .then((data) => {
        setWishlist(data);
        setMostrarWishlist(true);
      })
      .catch((err) => setErrorWishlist(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargandoWishlist(false));
  }

  function handleBuscarDuplicados() {
    cerrarResultados();
    setCargandoDuplicados(true);
    setErrorDuplicados(null);
    fetch(`${API_URL}/api/comics/duplicados`)
      .then(manejarRespuesta)
      .then((data) => {
        setDuplicados(data);
        setBuscadoDuplicados(true);
      })
      .catch((err) => setErrorDuplicados(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargandoDuplicados(false));
  }

  function handleBuscar() {
    let url = `${API_URL}/api/gcd/buscar?serie=${encodeURIComponent(serie)}`;
    if (numero) {
      url += `&numero=${encodeURIComponent(numero)}`;
    }

    cerrarResultados();
    setCargando(true);
    setError(null);
    fetch(url)
      .then(manejarRespuesta)
      .then((data) => {
        setResultados(data);
        setBuscado(true);
      })
      .catch((err) => setError(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargando(false));
  }

  function handleBuscarCuriosidad() {
    const url = `${API_URL}/api/tomos/buscar-curiosidades?texto=${encodeURIComponent(textoCuriosidad)}`;

    cerrarResultados();
    setCargandoCuriosidad(true);
    setErrorCuriosidad(null);
    fetch(url)
      .then(manejarRespuesta)
      .then((data) => {
        setResultadosCuriosidad(data);
        setBuscadoCuriosidad(true);
      })
      .catch((err) => setErrorCuriosidad(err.codigo ? err : { codigo: "—", mensaje: "No se pudo conectar con el servidor" }))
      .finally(() => setCargandoCuriosidad(false));
  }

  return (
    <div>
      <TituloPagina
        titulo="Archivo"
        descripcion="Cruce con la base de datos GCD (ediciones USA) y mis notas personales."
      />

      <div className="grid items-start gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Panel titulo="Contrastar con GCD">
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                label="Título (inglés)"
                placeholder="Detective Comics"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
              />
              <Campo
                label="Número (opcional)"
                placeholder="#27"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>

            <Boton className="mt-4" onClick={handleBuscar}>Buscar en GCD</Boton>

            {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}

            {error && (
              <div className="mt-4 rounded-lg bg-state-warning-bg p-3 text-sm text-state-warning-text">
                <p className="font-medium">Error {error.codigo}</p>
                <p>{error.mensaje}</p>
              </div>
            )}
          </Panel>
        <Panel titulo="Duplicados">
          <p className="text-sm text-text-secondary">Comics que tengo en más de un tomo, y en cuáles aparecen.</p>
          <Boton className="mt-4" onClick={handleBuscarDuplicados}>Duplicados</Boton>

          {cargandoDuplicados && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}

          {errorDuplicados && (
            <div className="mt-4 rounded-lg bg-state-warning-bg p-3 text-sm text-state-warning-text">
              <p className="font-medium">Error {errorDuplicados.codigo}</p>
              <p>{errorDuplicados.mensaje}</p>
            </div>
          )}
        </Panel>
        </div>
        <div className="space-y-6">
          <Panel titulo="Curiosidades">
            <Campo
              label="Buscar en mis notas"
              placeholder="firma, dedicatoria, estado, anécdota..."
              value={textoCuriosidad}
              onChange={(e) => setTextoCuriosidad(e.target.value)}
            />

            <Boton className="mt-4" onClick={handleBuscarCuriosidad}>Buscar</Boton>

            {cargandoCuriosidad && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}

            {errorCuriosidad && (
              <div className="mt-4 rounded-lg bg-state-warning-bg p-3 text-sm text-state-warning-text">
                <p className="font-medium">Error {errorCuriosidad.codigo}</p>
                <p>{errorCuriosidad.mensaje}</p>
              </div>
            )}
          </Panel>
          <Panel titulo="WishList">
            <p className="text-sm text-text-secondary">Los comics que quiero conseguir.</p>
            <Boton className="mt-4" onClick={cargarWishlist}>WishList</Boton>

            {cargandoWishlist && <p className="mt-4 text-sm text-text-secondary">Cargando...</p>}

            {errorWishlist && (
              <div className="mt-4 rounded-lg bg-state-warning-bg p-3 text-sm text-state-warning-text">
                <p className="font-medium">Error {errorWishlist.codigo}</p>
                <p>{errorWishlist.mensaje}</p>
              </div>
            )}
          </Panel>
        </div>
      </div>

      {buscadoDuplicados && !cargandoDuplicados && (
        <Panel titulo={`Duplicados (${duplicados.length})`} className="relative mt-6">
          <button
            type="button"
            aria-label="Cerrar duplicados"
            title="Cerrar"
            onClick={() => setBuscadoDuplicados(false)}
            className="absolute right-4 top-4 rounded px-2 text-xl leading-none text-text-secondary transition hover:text-accent-hover"
          >
            ×
          </button>
          {duplicados.length === 0 ? (
            <p className="text-sm text-text-secondary">No tienes ningún comic repetido en varios tomos</p>
          ) : (
            <div className="space-y-3">
              {duplicados.map((comic) => (
                <div key={comic.id} className="rounded-lg border border-border bg-banner p-3">
                  <h3 className="font-sans text-xl text-text">
                    <Link to={`/comics/${comic.id}`} className="hover:text-accent">
                      {comic.nombre} #{comic.numero}
                    </Link>
                    {comic.anho ? ` (${comic.anho})` : ""}
                  </h3>
                  <p className="text-sm text-text-secondary">Aparece en {comic.tomos.length} tomos:</p>
                  <ul className="mt-1 list-disc pl-5 text-base text-text-secondary">
                    {comic.tomos.map((tomo) => (
                      <li key={tomo.id}>
                        <Link to={`/tomos/${tomo.id}`} className="hover:text-accent">{tomo.nombre}</Link>
                        {tomo.editorial ? ` — ${tomo.editorial}` : ""}{tomo.anhoEdicion ? ` (${tomo.anhoEdicion})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {mostrarWishlist && !cargandoWishlist && (
        <Panel titulo={`WishList (${wishlist.length})`} className="relative mt-6">
          <button
            type="button"
            aria-label="Cerrar WishList"
            title="Cerrar"
            onClick={() => setMostrarWishlist(false)}
            className="absolute right-4 top-4 rounded px-2 text-xl leading-none text-text-secondary transition hover:text-accent-hover"
          >
            ×
          </button>

          {wishlist.length === 0 ? (
            <p className="text-sm text-text-secondary">La WishList está vacía</p>
          ) : (
            <div className="space-y-3">
              {wishlist.map((w) => {
                const base = w.titulo || `${w.serie}${w.numero ? ` #${w.numero}` : ""}`;
                return (
                  <div
                    key={w.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-banner p-3"
                  >
                    <div>
                      <h3 className="font-sans text-xl text-text">{w.anio ? `${base} (${w.anio})` : base}</h3>
                      {w.titulo && (
                        <p className="text-sm text-text-secondary">{w.serie}{w.numero ? ` #${w.numero}` : ""}</p>
                      )}
                      {w.notas && <p className="text-sm text-text-secondary">{w.notas}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {w.loTengo && <Etiqueta texto="Ya lo tengo" tono="success" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      )}

      {buscado && !cargando && (
        <Panel titulo={`Resultados GCD — "${serie}"`} className="mt-6">
          {resultados.length === 0 ? (
            <p className="text-sm text-text-secondary">
              No se ha encontrado ninguna serie llamada "{serie}" en el archivo GCD
            </p>
          ) : (
            <div className="space-y-3">
              {resultados.map((comic) => {
                const estado = estadoComic(comic);
                const base = comic.titulo || `${comic.serie} #${comic.numero}`;
                const encabezado = comic.anio ? `${base} (${comic.anio})` : base;
                return (
                  <div
                    key={comic.gcdIssueId}
                    className="flex items-center justify-between rounded-lg border border-border bg-banner p-3"
                  >
                    <div>
                      <h3 className="font-sans text-xl text-text">{encabezado}</h3>
                      {comic.titulo && (
                        <p className="text-sm text-text-secondary">
                          {comic.serie} #{comic.numero}
                        </p>
                      )}
                    </div>
                    <Etiqueta texto={estado.texto} tono={estado.tono} />
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      )}

      {buscadoCuriosidad && !cargandoCuriosidad && (
        <Panel titulo={`Resultados curiosidades — "${textoCuriosidad}"`} className="mt-6">
          {resultadosCuriosidad.length === 0 ? (
            <p className="text-sm text-text-secondary">
              No se ha encontrado "{textoCuriosidad}" en ninguna curiosidad
            </p>
          ) : (
            <div className="space-y-3">
              {resultadosCuriosidad.map((tomo) => (
                <div key={tomo.id} className="rounded-lg border border-border bg-banner p-3">
                  <h3 className="font-sans text-xl text-text">
                    <Link to={`/tomos/${tomo.id}`} className="hover:text-accent">{tomo.nombre}</Link>
                  </h3>
                  <p className="text-sm text-text-secondary">{tomo.editorial} — {tomo.anhoEdicion}</p>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}
    </div>
  );
}

export { Archivo };
