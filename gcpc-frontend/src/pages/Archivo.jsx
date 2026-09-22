import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../config.js";

function Archivo() {
  const [serie, setSerie] = useState("");
  const [numero, setNumero] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);
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
    
    return (
      <div>
        <h1>Archivo</h1>
        <input
          type="text"
          placeholder="Serie USA"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número (opcional)"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>

        {cargando && <h4>Buscando...</h4>}

        {error && (
          <div>
            <h2>Error</h2>
            <p>Código: {error.codigo}</p>
            <p>{error.mensaje}</p>
          </div>
        )}

        {buscado && !cargando &&
          (resultados.length === 0 ? (
            <p>
              No se ha encontrado ninguna serie llamada "{serie}" en el archivo
              GCD
            </p>
          ) : (
            resultados.map((comic) => (
              <div key={comic.gcdIssueId}>
                <h3>{comic.titulo}</h3>
                <p>
                  {comic.serie} #{comic.numero}
                </p>
                <p>{comic.loTengo ? "✅ Lo tienes" : "❌ No lo tienes"}</p>
              </div>
            ))
          ))}
      </div>
    );
  }


export { Archivo };
