import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { Campo } from '../components/Campo.jsx'
import { Boton } from '../components/Boton.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

const ROLES = [
  { valor: 'GUION', etiqueta: 'Guionista' },
  { valor: 'DIBUJO', etiqueta: 'Dibujante' },
  { valor: 'COLOR', etiqueta: 'Colorista' },
  { valor: 'ENTINTADO', etiqueta: 'Entintador' },
  { valor: 'ROTULACION', etiqueta: 'Rotulador' },
]

function Personas() {
  const [personas, setPersonas] = useState([])
  const [texto, setTexto] = useState('')
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [rolesSeleccionados, setRolesSeleccionados] = useState([])
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
    fetch(`${API_URL}/api/personas`)
      .then(manejarRespuesta)
      .then(data => setPersonas(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  const sugerencias = texto
    ? personas.filter(persona =>
        persona.nombre.toLowerCase().includes(texto.toLowerCase())
      )
    : []

  function buscarComics(nombre, roles) {
    const params = new URLSearchParams({ nombre })
    roles.forEach(rol => params.append('roles', rol))

    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/personas/buscar?${params.toString()}`)
      .then(manejarRespuesta)
      .then(data => {
        setComics(data)
        setBuscado(true)
      })
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
      .finally(() => setCargando(false))
  }

  function handleSeleccionar(persona) {
    setTexto(persona.nombre)
    setMostrarSugerencias(false)
    buscarComics(persona.nombre, rolesSeleccionados)
  }

  function handleToggleRol(rol) {
    const nuevosRoles = rolesSeleccionados.includes(rol)
      ? rolesSeleccionados.filter(r => r !== rol)
      : [...rolesSeleccionados, rol]

    setRolesSeleccionados(nuevosRoles)

    if (buscado && texto) {
      buscarComics(texto, nuevosRoles)
    }
  }

  function handleLimpiar() {
    setTexto('')
    setMostrarSugerencias(false)
    setRolesSeleccionados([])
    setComics([])
    setBuscado(false)
  }

  return (
    <div>
      <TituloPagina
        titulo="Personas"
        descripcion="Busca ejemplares por autor y filtra por su rol: guionista, dibujante, colorista..."
      />

      <Panel titulo="Buscar autor">
        <div className="relative">
          <Campo
            label="Nombre"
            placeholder="Buscar por nombre..."
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value)
              setMostrarSugerencias(true)
            }}
          />

          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              {sugerencias.map(persona => (
                <li
                  key={persona.id}
                  onClick={() => handleSeleccionar(persona)}
                  className="cursor-pointer px-3 py-2 text-sm text-text hover:bg-surface-hover"
                >
                  {persona.nombre} {persona.localidad ? `(${persona.localidad})` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {ROLES.map(({ valor, etiqueta }) => {
            const activo = rolesSeleccionados.includes(valor)
            return (
              <label
                key={valor}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  activo
                    ? 'border-accent bg-state-warning-bg text-state-warning-text'
                    : 'border-border bg-bg text-text-secondary hover:text-text'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activo}
                  onChange={() => handleToggleRol(valor)}
                />
                {etiqueta}
              </label>
            )
          })}
        </div>

        <Boton className="mt-4" onClick={handleLimpiar}>Limpiar</Boton>

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

export { Personas }
