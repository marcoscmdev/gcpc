import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:8080'

const ROLES = [
  { valor: 'GUION', etiqueta: 'Guionista' },
  { valor: 'DIBUJO', etiqueta: 'Dibujante' },
  { valor: 'COLOR', etiqueta: 'Colorista' },
]

function Personas() {

  const [personas, setPersonas] = useState([])
  const [texto, setTexto] = useState('')
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [rolesSeleccionados, setRolesSeleccionados] = useState([])
  const [comics, setComics] = useState([])
  const [buscado, setBuscado] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/personas`)
      .then(response => response.json())
      .then(data => setPersonas(data))
  }, [])

  const sugerencias = texto
    ? personas.filter(persona =>
        persona.nombre.toLowerCase().includes(texto.toLowerCase())
      )
    : []

  function buscarComics(nombre, roles) {
    const params = new URLSearchParams({ nombre })
    roles.forEach(rol => params.append('roles', rol))

    fetch(`${API_URL}/api/personas/buscar?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        setComics(data)
        setBuscado(true)
      })
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

      {buscado && (
        <ul>
          {comics.map(comic => (
            <li key={comic.id}>
              {comic.nombre} #{comic.numero} ({comic.anho})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { Personas }