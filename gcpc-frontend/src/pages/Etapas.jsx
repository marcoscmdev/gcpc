import { useState, useEffect } from 'react'

function Etapas() {
  const [etapas, setEtapas] = useState([])
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
    fetch('http://localhost:8080/api/etapas')
      .then(response => response.json())
      .then(data => setEtapas(data))
  }, [])

  function handleSeleccionar(etapa) {
    setSeleccionado(etapa.id)
    fetch(`http://localhost:8080/api/etapas/buscar?nombre=${encodeURIComponent(etapa.nombre)}`)
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


     {buscado && (
  comics.length === 0 ? (
    <p>No se han encontrado cómics de esta etapa</p>
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

export { Etapas }