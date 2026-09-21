import { useState, useEffect } from 'react'

function Personajes() {
  const [personajes, setPersonajes] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)
  const [comics, setComics] = useState([])
  const [buscado, setBuscado] = useState(false)
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
    fetch('http://localhost:8080/api/personajes')
      .then(response => response.json())
      .then(data => setPersonajes(data))
  }, [])

  function handleSeleccionar(personaje) {
    setSeleccionado(personaje.id)
    fetch(`http://localhost:8080/api/personajes/buscar?nombre=${encodeURIComponent(personaje.nombre)}`)
      .then(response => response.json())
      .then(data => {
        setComics(data)
        setBuscado(true)
      })
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


      {buscado && (
        comics.length === 0 ? (
          <p>No se han encontrado cómics de este personaje</p>
        ) : (
    Object.values(comicsPorTomo).map(grupo => (
      <div key={grupo.tomo.id}>
        <h3>Tomo: {grupo.tomo.nombre}</h3>
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