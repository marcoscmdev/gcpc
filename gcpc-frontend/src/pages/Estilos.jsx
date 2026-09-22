import { useState, useEffect } from 'react'

function Estilos() {
  const [estilos, setEstilos] = useState([])
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
    fetch('http://localhost:8080/api/estilos')
      .then(response => response.json())
      .then(data => setEstilos(data))
  }, [])

  function handleSeleccionar(estilo) {
    setSeleccionado(estilo.id)
    setCargando(true)
    fetch(`http://localhost:8080/api/estilos/buscar?nombre=${encodeURIComponent(estilo.nombre)}`)
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
      <h1>Estilos</h1>
      <button onClick={handleQuitarSeleccion}>Quitar selección</button>

      <div>
        {estilos.map(estilo => (
          <label key={estilo.id}>
            <input
              type="radio"
              name="estilo"
              checked={seleccionado === estilo.id}
              onChange={() => handleSeleccionar(estilo)}
            />
            {estilo.nombre}
          </label>
        ))}
      </div>


     {cargando && <h4>Buscando...</h4>}
     {buscado && !cargando && (
  comics.length === 0 ? (
    <p>No se han encontrado cómics con este estilo</p>
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

export { Estilos }