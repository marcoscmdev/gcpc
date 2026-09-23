import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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

function TomoDetalle() {
  const { id } = useParams()
  const [tomo, setTomo] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/tomos/${id}`)
      .then(manejarRespuesta)
      .then(data => setTomo(data))
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

  if (!tomo) return null

  return (
    <div>
      <h1>{tomo.nombre}</h1>

      <img
        src={tomo.coverPath ?? '/img/portada-generica.jpg'}
        alt={tomo.nombre}
        width={200}
      />

      <p>Editorial: {tomo.editorial}</p>
      <p>Año de edición: {tomo.anhoEdicion}</p>
      {tomo.isbn && <p>ISBN: {tomo.isbn}</p>}
     <p>Notas: {tomo.notas}</p>
     <p>Curiosidades: {tomo.curiosidades}</p>
     <p>Puntuación: {tomo.ranking}</p>
     
      <hr />

      <h2>Cómics que contiene</h2>

      {tomo.comicsContiene.length === 0 ? (
        <p>Este tomo no tiene cómics asociados todavía</p>
      ) : (
        tomo.comicsContiene.map(comic => (
          <div key={comic.id}>
            <h3>{comic.nombre} #{comic.numero}</h3>
            <p>Año: {comic.anho ? comic.anho : 'Año sin especificar'}</p>

            {comic.etapa && <p>Etapa: {comic.etapa.nombre}</p>}

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

            {comic.notas && <p>Notas: {comic.notas}</p>}
          </div>
        ))
      )}
    </div>
  )
}

export { TomoDetalle }
