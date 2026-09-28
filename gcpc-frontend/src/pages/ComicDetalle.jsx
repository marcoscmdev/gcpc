import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../config.js'

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

function ComicDetalle() {
  const { id } = useParams()
  const [comic, setComic] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/comics/${id}`)
      .then(manejarRespuesta)
      .then(data => setComic(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <h4>Cargando...</h4>

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Código: {error.codigo}</p>
        <p>{error.mensaje}</p>
      </div>
    )
  }

  if (!comic) return null

  return (
    <div>
      <h1>{comic.nombre} #{comic.numero}</h1>

      <img
        src={comic.coverPath ?? '/img/portada-generica.jpg'}
        alt={comic.nombre}
        width={200}
      />

      <p>Año: {comic.anho ? comic.anho : 'Año sin especificar'}</p>
      {comic.etapa && <p>Etapa: {comic.etapa.nombre}</p>}
      <p>Puntuación: {comic.ranking ?? 'Sin puntuar'}</p>
      <p>Notas: {comic.notas || 'Sin notas'}</p>

      {comic.arcos.length > 0 && (
        <p>Arco{comic.arcos.length > 1 ? 's' : ''}: {comic.arcos.map(a => a.nombre).join(', ')}</p>
      )}

      {comic.estilos.length > 0 && (
        <p>Estilo{comic.estilos.length > 1 ? 's' : ''}: {comic.estilos.map(e => e.nombre).join(', ')}</p>
      )}

      {comic.personas.length > 0 && (
        <p>Autores: {comic.personas.map(p => `${p.nombre} (${p.rol})`).join(', ')}</p>
      )}

      {comic.personajes.length > 0 && (
        <p>Personajes: {comic.personajes.map(p => p.nombre).join(', ')}</p>
      )}

      <hr />

      <h2>Tomo</h2>
      {comic.tomos.length === 0 ? (
        <p>Grapa suelta — no pertenece a ningún tomo de la colección</p>
      ) : (
        comic.tomos.map(tomo => (
          <p key={tomo.id}>
            <Link to={`/tomos/${tomo.id}`}>{tomo.nombre}</Link>
          </p>
        ))
      )}
    </div>
  )
}

export { ComicDetalle }
