import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { SeccionColapsable } from '../components/SeccionColapsable.jsx'
import { Panel } from '../components/Panel.jsx'
import { Boton } from '../components/Boton.jsx'
import { Parrilla } from '../components/Parrilla.jsx'
import { TarjetaCircular } from '../components/TarjetaCircular.jsx'
import { InfoPersonaje } from '../components/InfoPersonaje.jsx'
import { MensajeError } from '../components/MensajeError.jsx'
import { slugificar } from '../utils/texto.js'

const SECCIONES = [
  { tipo: 'HEROE', titulo: 'Héroes' },
  { tipo: 'ANTIHEROE', titulo: 'Antihéroes' },
  { tipo: 'VILLANO', titulo: 'Villanos' },
  { tipo: 'OTRO', titulo: 'Otros' },
]

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

  const personajeSeleccionado = personajes.find(p => p.id === seleccionado)

  return (
    <div>
      <TituloPagina
        titulo="Personajes"
        descripcion="Filtra por los personajes que aparecen en cada cómic."
      />

      {!seleccionado && (
        <div className="space-y-6">
          {SECCIONES.map(({ tipo, titulo }) => {
            const personajesDelTipo = personajes.filter(p => p.tipo === tipo)
            if (personajesDelTipo.length === 0) return null

            return (
              <SeccionColapsable key={tipo} titulo={titulo}>
                <Parrilla
                  items={personajesDelTipo}
                  keyExtractor={(personaje) => personaje.id}
                  anchoMinimo="100px"
                  mensajeVacio="Todavía no tienes personajes registrados"
                  renderItem={(personaje) => (
                    <TarjetaCircular
                      imagen={`/img/personajes/${slugificar(personaje.nombre)}.jpg`}
                      alt={personaje.nombre}
                      nombre={personaje.nombre}
                      seleccionado={seleccionado === personaje.id}
                      onClick={() => handleSeleccionar(personaje)}
                    />
                  )}
                />
              </SeccionColapsable>
            )
          })}
        </div>
      )}

      {error && <MensajeError className="mt-6" codigo={error.codigo} mensaje={error.mensaje} />}

      {personajeSeleccionado && (
        <Panel className="mt-6">
          <InfoPersonaje
            personaje={personajeSeleccionado}
            imagen={`/img/personajes/${slugificar(personajeSeleccionado.nombre)}.jpg`}
          />
          <Boton className="mt-4" onClick={handleQuitarSeleccion}>Quitar selección</Boton>
          {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}
        </Panel>
      )}

      {buscado && !cargando && (
        <div className="mt-6">
          <ResultadosBusqueda comics={comics} />
        </div>
      )}
    </div>
  )
}

export { Personajes }
