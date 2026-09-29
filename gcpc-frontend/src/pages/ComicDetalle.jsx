import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../config.js'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

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

  if (cargando) return <p className="text-sm text-text-secondary">Cargando...</p>

  if (error) {
    return (
      <div>
        <TituloPagina titulo="Error" />
        <MensajeError codigo={error.codigo} mensaje={error.mensaje} />
      </div>
    )
  }

  if (!comic) return null

  return (
    <div>
      <TituloPagina titulo={`${comic.nombre} #${comic.numero}`} />

      <Panel>
        <div className="flex flex-col gap-6 sm:flex-row">
          <img
            src={comic.coverPath ?? '/img/portada-generica.jpg'}
            alt={comic.nombre}
            className="w-40 shrink-0 self-start aspect-[2/3] rounded-lg object-cover"
          />

          <div className="space-y-2 text-base text-text-secondary">
            <p>Año: <span className="text-text">{comic.anho ? comic.anho : 'Año sin especificar'}</span></p>
            {comic.etapa && <p>Etapa: <span className="text-text">{comic.etapa.nombre}</span></p>}
            <p>Puntuación: <span className="text-text">{comic.ranking ?? 'Sin puntuar'}</span></p>
            <p>Notas: <span className="text-text">{comic.notas || 'Sin notas'}</span></p>

            {comic.arcos.length > 0 && (
              <p>Arco{comic.arcos.length > 1 ? 's' : ''}: <span className="text-text">{comic.arcos.map(a => a.nombre).join(', ')}</span></p>
            )}

            {comic.estilos.length > 0 && (
              <p>Estilo{comic.estilos.length > 1 ? 's' : ''}: <span className="text-text">{comic.estilos.map(e => e.nombre).join(', ')}</span></p>
            )}

            {comic.personas.length > 0 && (
              <p>Autores: <span className="text-text">{comic.personas.map(p => `${p.nombre} (${p.rol})`).join(', ')}</span></p>
            )}

            {comic.personajes.length > 0 && (
              <p>Personajes: <span className="text-text">{comic.personajes.map(p => p.nombre).join(', ')}</span></p>
            )}
          </div>
        </div>
      </Panel>

      <Panel titulo="Tomo" className="mt-6">
        {comic.tomos.length === 0 ? (
          <p className="text-sm text-text-secondary">Cómic suelto — no pertenece a ningún tomo de tu colección</p>
        ) : (
          <div className="space-y-2">
            {comic.tomos.map(tomo => (
              <p key={tomo.id}>
                <Link to={`/tomos/${tomo.id}`} className="text-text hover:text-accent">{tomo.nombre}</Link>
              </p>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

export { ComicDetalle }
