import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { SeccionColapsable } from '../components/SeccionColapsable.jsx'
import { Boton } from '../components/Boton.jsx'
import { Parrilla } from '../components/Parrilla.jsx'
import { TarjetaInfo } from '../components/TarjetaInfo.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

const ETIQUETAS_TIPO = {
  arco: 'Arco',
  saga: 'Saga',
  evento: 'Evento',
  antologia: 'Antología',
  especial: 'Especial',
}

const SECCIONES = [
  { tipo: 'saga', titulo: 'Sagas' },
  { tipo: 'arco', titulo: 'Arcos' },
  { tipo: 'evento', titulo: 'Eventos' },
  { tipo: 'antologia', titulo: 'Antologías' },
  { tipo: 'especial', titulo: 'Especiales' },
]

function metaArco(arco) {
  const partes = []
  if (arco.anho) partes.push(String(arco.anho))
  if (arco.tipo) partes.push(ETIQUETAS_TIPO[arco.tipo] || arco.tipo)
  return partes.join(' · ') || null
}

function Arcos() {
  const [arcos, setArcos] = useState([])
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

  useEffect(() => {
    fetch(`${API_URL}/api/arcos-argumentales`)
      .then(manejarRespuesta)
      .then(data => setArcos(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(arco) {
    setSeleccionado(arco.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/arcos-argumentales/${arco.id}/comics`)
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

  const arcoSeleccionado = arcos.find(a => a.id === seleccionado)

  return (
    <div>
      <TituloPagina
        titulo="Arcos"
        descripcion="Busca todos los ejemplares de un arco argumental."
      />

      {!seleccionado && (
        <div className="space-y-6">
          {arcos.length === 0 && (
            <p className="text-sm text-text-secondary">Todavía no tienes arcos argumentales registrados</p>
          )}
          {SECCIONES.map(({ tipo, titulo }) => {
            const arcosDelTipo = arcos.filter(a => a.tipo === tipo)
            if (arcosDelTipo.length === 0) return null

            return (
              <SeccionColapsable key={tipo} titulo={`${titulo} (${arcosDelTipo.length})`} abiertoPorDefecto={false}>
                <Parrilla
                  items={arcosDelTipo}
                  keyExtractor={(arco) => arco.id}
                  anchoMinimo="220px"
                  renderItem={(arco) => (
                    <TarjetaInfo
                      nombre={arco.nombre}
                      subtitulo={arco.nombreOriginal}
                      meta={metaArco(arco)}
                      descripcion={arco.descripcion}
                      seleccionado={seleccionado === arco.id}
                      onClick={() => handleSeleccionar(arco)}
                    />
                  )}
                />
              </SeccionColapsable>
            )
          })}
        </div>
      )}

      {error && <MensajeError className="mt-6" codigo={error.codigo} mensaje={error.mensaje} />}

      {arcoSeleccionado && (
        <Panel className="mt-6">
          <TarjetaInfo
            nombre={arcoSeleccionado.nombre}
            subtitulo={arcoSeleccionado.nombreOriginal}
            meta={metaArco(arcoSeleccionado)}
            descripcion={arcoSeleccionado.descripcion}
            seleccionado
          />
          <Boton className="mt-4" onClick={handleQuitarSeleccion}>Quitar selección</Boton>
          {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}
        </Panel>
      )}

      {buscado && !cargando && (
        <div className="mt-6">
          <ResultadosBusqueda comics={comics} />
        </div>
      )}
    </div>
  )
}

export { Arcos }
