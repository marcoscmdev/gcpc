import { useState, useEffect } from 'react'

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
    fetch(`http://localhost:8080/api/personas`)
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

    fetch(`http://localhost:8080/api/personas/buscar?${params.toString()}`)
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

       {buscado && (
  comics.length === 0 ? (
    <p>No se han encontrado cómics para esta persona </p>
  ) : (
    Object.values(comicsPorTomo).map(grupo => (
      <div key={grupo.tomo.id}>
        <h3>Tomo: {grupo.tomo.nombre}</h3>
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