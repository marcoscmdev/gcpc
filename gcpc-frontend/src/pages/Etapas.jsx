import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'

function Etapas() {
  const [etapas, setEtapas] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)
  const [comics, setComics] = useState([])
  const [buscado, setBuscado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  function manejarRespuesta(response) {
    if (!response.ok) {
      return response.json()
        .catch(() => ({}))
        .then(body => {
          throw { codigo: response.status, mensaje: body.message || body.error || 'Error desconocido' }
        })
    }
    return response.json()
  }

  useEffect(() => {
    fetch(`${API_URL}/api/etapas`)
      .then(manejarRespuesta)
      .then(data => setEtapas(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(etapa) {
    setSeleccionado(etapa.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/etapas/buscar?nombre=${encodeURIComponent(etapa.nombre)}`)
      .then(manejarRespuesta)
      .then(data => {
        setComics(data)
        setBuscado(true)
      })
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
      .finally(() => setCargando(false))
  }

  function handleQuitarSeleccion() {
    setSeleccionado(null)
    setComics([])
    setBuscado(false)
  }

  return (
    <div>
      <h1>Etapas</h1>
      <button onClick={handleQuitarSeleccion}>Quitar selección</button>

      <div>
        {etapas.map(etapa => (
          <label key={etapa.id}>
            <input
              type="radio"
              name="etapa"
              checked={seleccionado === etapa.id}
              onChange={() => handleSeleccionar(etapa)}
            />
            {etapa.nombre}
          </label>
        ))}
      </div>

      {cargando && <h4>Buscando...</h4>}
      {error && (
        <div>
          <h2>Error</h2>
          <p>Código: {error.codigo}</p>
          <p>{error.mensaje}</p>
        </div>
      )}

      {buscado && !cargando && <ResultadosBusqueda comics={comics} />}
    </div>
  )
}

export { Etapas }
