import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'

function Arcos() {
  const [arcos, setArcos] = useState([])
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
    fetch(`${API_URL}/api/arcos-argumentales`)
      .then(manejarRespuesta)
      .then(data => setArcos(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(arco) {
    setSeleccionado(arco.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/arcos-argumentales/buscar?nombre=${encodeURIComponent(arco.nombre)}`)
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
      <h1>Arcos</h1>
      <button onClick={handleQuitarSeleccion}>Quitar selección</button>

      <div>
        {arcos.map(arco => (
          <label key={arco.id}>
            <input
              type="radio"
              name="arco"
              checked={seleccionado === arco.id}
              onChange={() => handleSeleccionar(arco)}
            />
            {arco.nombre}
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

export { Arcos }
