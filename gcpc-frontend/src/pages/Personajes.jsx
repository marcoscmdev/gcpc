import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'

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
     const comicsPorTomo = comics.reduce((grupos, comic) => {
  comic.tomos.forEach(tomo => {
    if (!grupos[tomo.id]) {
      grupos[tomo.id] = { tomo, comics: [] }
    }
    grupos[tomo.id].comics.push(comic)
  })
  return grupos
}, {})


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
      <h1>Personajes</h1>
      <button onClick={handleQuitarSeleccion}>Quitar selección</button>

      <div>
        {personajes.map(personaje => (
          <label key={personaje.id}>
            <input
              type="radio"
              name="personaje"
              checked={seleccionado === personaje.id}
              onChange={() => handleSeleccionar(personaje)}
            />
            {personaje.nombre}
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

     {buscado && !cargando && (
        comics.length === 0 ? (
          <p>No se han encontrado cómics de este personaje</p>
        ) : (
    Object.values(comicsPorTomo).map(grupo => (
      <div key={grupo.tomo.id}>
        <h3>Tomo: {grupo.tomo.nombre}</h3>
         {grupo.tomo.coverPath ? (
            <img src={grupo.tomo.coverPath} alt={grupo.tomo.nombre} />
          ) : (
            <img src= "/img/portada-generica.jpg" alt="Sin portada" />
          )}
        {grupo.comics.map(comic => (
          <p key={comic.id}>
            {comic.nombre} #{comic.numero} ({comic.anho ? comic.anho : 'Año sin especificar'})
          </p>
        ))}
      </div>
    ))
  )
      )}
    </div>
  )
}

export { Personajes }