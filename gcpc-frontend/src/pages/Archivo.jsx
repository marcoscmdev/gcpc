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

  function handleBuscar() {
    let url = `${API_URL}/api/gcd/buscar?serie=${encodeURIComponent(serie)}`;
    if (numero) {
      url += `&numero=${encodeURIComponent(numero)}`;
    }

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

      <div className="grid gap-6 md:grid-cols-2">
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
      </div>

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
                const encabezado = comic.titulo || `${comic.serie} #${comic.numero}`;
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
