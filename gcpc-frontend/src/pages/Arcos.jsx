import { useState, useEffect } from 'react'

function Arcos() {
  const [arcos, setArcos] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)
  const [comics, setComics] = useState([])
  const [buscado, setBuscado] = useState(false)
  const [cargando, setCargando] = useState(false)

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
    fetch('http://localhost:8080/api/arcos-argumentales')
      .then(response => response.json())
      .then(data => setArcos(data))
  }, [])

  function handleSeleccionar(arco) {
    setSeleccionado(arco.id)
    setCargando(true)
    fetch(`http://localhost:8080/api/arcos-argumentales/buscar?nombre=${encodeURIComponent(arco.nombre)}`)
      .then(response => response.json())
      .then(data => {
        setComics(data)
        setBuscado(true)
      })
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

     {buscado && !cargando && (
  comics.length === 0 ? (
    <p>No se han encontrado cómics de este arco</p>
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

export { Arcos }