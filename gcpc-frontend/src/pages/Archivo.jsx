import React from "react";
import { useState, useEffect } from "react";

function Archivo() {
  const [serie, setSerie] = useState("");
  const [numero, setNumero] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);

  function handleBuscar() {
    let url = `http://localhost:8080/api/gcd/buscar?serie=${encodeURIComponent(serie)}`;
    if (numero) {
      url += `&numero=${encodeURIComponent(numero)}`;
    }

    setCargando(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResultados(data);
        setBuscado(true);
      })
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
