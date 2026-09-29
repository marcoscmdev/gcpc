import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { Boton } from '../components/Boton.jsx'
import { ListaSeleccion } from '../components/ListaSeleccion.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

function Personajes() {
  const [personajes, setPersonajes] = useState([])
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
    fetch(`${API_URL}/api/personajes`)
      .then(manejarRespuesta)
      .then(data => setPersonajes(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(personaje) {
    setSeleccionado(personaje.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/personajes/buscar?nombre=${encodeURIComponent(personaje.nombre)}`)
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
      <TituloPagina
        titulo="Personajes"
        descripcion="Filtra por los personajes que aparecen en cada cómic."
      />

      <Panel titulo="Selecciona un personaje">
        <ListaSeleccion
          items={personajes}
          seleccionadoId={seleccionado}
          onSeleccionar={handleSeleccionar}
          name="personaje"
        />

        {seleccionado && (
          <Boton className="mt-4" onClick={handleQuitarSeleccion}>Quitar selección</Boton>
        )}

        {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}
        {error && <MensajeError className="mt-4" codigo={error.codigo} mensaje={error.mensaje} />}
      </Panel>

      {buscado && !cargando && (
        <div className="mt-6">
          <ResultadosBusqueda comics={comics} />
        </div>
      )}
    </div>
  )
}

export { Personajes }
