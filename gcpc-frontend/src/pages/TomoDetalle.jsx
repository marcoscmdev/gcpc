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

  if (cargando) return <p className="text-sm text-text-secondary">Cargando...</p>

  if (error) {
    return (
      <div>
        <TituloPagina titulo="Error" />
        <MensajeError codigo={error.codigo} mensaje={error.mensaje} />
      </div>
    )
  }

  if (!tomo) return null

  return (
    <div>
      <TituloPagina titulo={tomo.nombre} />

      <Panel>
        <div className="flex flex-col gap-6 sm:flex-row">
          <img
            src={tomo.coverPath ?? '/img/portada-generica.jpg'}
            alt={tomo.nombre}
            className="w-40 shrink-0 self-start aspect-[2/3] rounded-lg object-cover"
          />

          <div className="space-y-2 text-base text-text-secondary">
            <p>Editorial: <span className="text-text">{tomo.editorial}</span></p>
            <p>Año de edición: <span className="text-text">{tomo.anhoEdicion}</span></p>
            {tomo.isbn && <p>ISBN: <span className="text-text">{tomo.isbn}</span></p>}
            <p>Notas: <span className="text-text">{tomo.notas}</span></p>
            <p>Curiosidades: <span className="text-text">{tomo.curiosidades}</span></p>
            <p>Puntuación: <span className="text-text">{tomo.ranking}</span></p>
          </div>
        </div>
      </Panel>

      <Panel titulo="Cómics que contiene" className="mt-6">
        {tomo.comicsContiene.length === 0 ? (
          <p className="text-sm text-text-secondary">Este tomo no tiene cómics asociados todavía</p>
        ) : (
          <div className="space-y-4">
            {tomo.comicsContiene.map(comic => (
              <Link
                key={comic.id}
                to={`/comics/${comic.id}`}
                className="group block rounded-lg border-2 border-border bg-banner p-3 transition hover:scale-[1.02] hover:border-accent-hover"
              >
                <h3 className="font-sans text-lg text-text transition-colors group-hover:text-accent-hover">
                  {comic.nombre} #{comic.numero}
                </h3>
                <div className="mt-1 space-y-1 text-base text-text-secondary">
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
              </Link>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

export { TomoDetalle }
