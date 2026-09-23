import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config.js'

const ROLES = [
  { valor: 'GUION', etiqueta: 'Guionista' },
  { valor: 'DIBUJO', etiqueta: 'Dibujante' },
  { valor: 'COLOR', etiqueta: 'Colorista' },
  {valor: 'ENTINTADO', etiqueta: 'Entintador' },
  {valor: 'ROTULACION', etiqueta: 'Rotulador' },
]
function Personas() {

  const [personas, setPersonas] = useState([])
  const [texto, setTexto] = useState('')
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [rolesSeleccionados, setRolesSeleccionados] = useState([])
  const [comics, setComics] = useState([])
  const [buscado, setBuscado] = useState(false)

  const comicsPorTomo = comics.reduce((acc, comic) => {
  comic.tomos.forEach(tomo => {
    if (!acc[tomo.id]) {
      acc[tomo.id] = { tomo, comics: [] }
    }
    acc[tomo.id].comics.push(comic)
  })
  return acc
}, {})

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
      <h1>Personas</h1>

      <div style={{ position: 'relative' }}>
        <input
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value)
            setMostrarSugerencias(true)
          }}
          placeholder="Buscar por nombre..."
        />

        {mostrarSugerencias && sugerencias.length > 0 && (
          <ul>
            {sugerencias.map(persona => (
              <li key={persona.id} onClick={() => handleSeleccionar(persona)}>
                {persona.nombre} {persona.localidad ? `(${persona.localidad})` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {ROLES.map(({ valor, etiqueta }) => (
          <label key={valor}>
            <input
              type="checkbox"
              checked={rolesSeleccionados.includes(valor)}
              onChange={() => handleToggleRol(valor)}
            />
            {etiqueta}
          </label>
        ))}
      </div>
      <button onClick={handleLimpiar}>Limpiar</button>

       {cargando && <h4>Buscando...</h4>}

{error && (
  <div>
    <h2>Error</h2>
    <p>Código: {error.codigo}</p>
    <p>{error.mensaje}</p>
  </div>
)}

{buscado && !cargando &&(
  comics.length === 0 ? (
    <p>No se han encontrado cómics para esta persona </p>
  ) : (
    Object.values(comicsPorTomo).map(grupo => (
      <div key={grupo.tomo.id}>
        <h3>Tomo: <Link to={`/tomos/${grupo.tomo.id}`}>{grupo.tomo.nombre}</Link></h3>
         {grupo.tomo.coverPath ? (
            <img src={grupo.tomo.coverPath} alt={grupo.tomo.nombre} />
          ) : (
            <img src= "/img/portada-generica.jpg" alt="Sin portada" />
          )}
        {grupo.comics.map(comic => (
          <p key={comic.id}>
            {comic.nombre} #{comic.numero} ({comic.anho ? comic.anho : 'Año sin especificar'} {comic.roles.join(', ')})
          </p>
        ))}
      </div>
    ))
  )
)}
    </div>
  )
}

export { Personas }