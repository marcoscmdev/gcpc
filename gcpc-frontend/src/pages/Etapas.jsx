import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { ListaGcd } from '../components/ListaGcd.jsx'
import { SeccionColapsable } from '../components/SeccionColapsable.jsx'
import { Boton } from '../components/Boton.jsx'
import { Parrilla } from '../components/Parrilla.jsx'
import { TarjetaInfo } from '../components/TarjetaInfo.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

const SECCIONES = [
  { tipo: 'edad', titulo: 'Edades' },
  { tipo: 'era_editorial', titulo: 'Eras editoriales' },
  { tipo: 'autor', titulo: 'Etapas de autor' },
]

function rangoAnhos(etapa) {
  if (!etapa.anhoInicio) return null
  if (!etapa.anhoFin) return `Desde ${etapa.anhoInicio}`
  return `${etapa.anhoInicio} – ${etapa.anhoFin}`
}

function Etapas() {
  const [etapas, setEtapas] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)
  const [comics, setComics] = useState([])
  const [gcd, setGcd] = useState([])
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
    fetch(`${API_URL}/api/etapas`)
      .then(manejarRespuesta)
      .then(data => setEtapas(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(etapa) {
    setSeleccionado(etapa.id)
    setCargando(true)
    setError(null)
    Promise.all([
      fetch(`${API_URL}/api/etapas/${etapa.id}/comics`).then(manejarRespuesta),
      fetch(`${API_URL}/api/etapas/${etapa.id}/gcd`).then(manejarRespuesta),
    ])
      .then(([dataComics, dataGcd]) => {
        setComics(dataComics)
        setGcd(dataGcd)
        setBuscado(true)
      })
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
      .finally(() => setCargando(false))
  }

  function handleQuitarSeleccion() {
    setSeleccionado(null)
    setComics([])
    setGcd([])
    setBuscado(false)
  }

  const etapaSeleccionada = etapas.find(e => e.id === seleccionado)

  return (
    <div>
      <TituloPagina
        titulo="Etapas"
        descripcion="Filtra por etapa."
      />

      {!seleccionado && (
        <div className="space-y-6">
          {etapas.length === 0 && (
            <p className="text-sm text-text-secondary">Todavía no tienes etapas registradas</p>
          )}
          {SECCIONES.map(({ tipo, titulo }) => {
            const etapasDelTipo = etapas
              .filter(e => e.tipo === tipo)
              .sort((a, b) => a.anhoInicio - b.anhoInicio || a.id - b.id)
            if (etapasDelTipo.length === 0) return null

            return (
              <SeccionColapsable key={tipo} titulo={`${titulo} (${etapasDelTipo.length})`} abiertoPorDefecto={tipo !== 'autor'}>
                <Parrilla
                  items={etapasDelTipo}
                  keyExtractor={(etapa) => etapa.id}
                  anchoMinimo="220px"
                  renderItem={(etapa) => (
                    <TarjetaInfo
                      nombre={etapa.nombre}
                      subtitulo={rangoAnhos(etapa)}
                      seleccionado={seleccionado === etapa.id}
                      onClick={() => handleSeleccionar(etapa)}
                    />
                  )}
                />
              </SeccionColapsable>
            )
          })}
        </div>
      )}

      {error && <MensajeError className="mt-6" codigo={error.codigo} mensaje={error.mensaje} />}

      {etapaSeleccionada && (
        <Panel className="mt-6">
          <TarjetaInfo
            nombre={etapaSeleccionada.nombre}
            subtitulo={rangoAnhos(etapaSeleccionada)}
            seleccionado
          />
          <Boton className="mt-4" onClick={handleQuitarSeleccion}>Quitar selección</Boton>
          {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}
        </Panel>
      )}

      {buscado && !cargando && (
        <div className="mt-6 space-y-6">
          <ResultadosBusqueda comics={comics} />
          <Panel>
            <ListaGcd titulo="Lo que me falta de la etapa" items={gcd} />
          </Panel>
        </div>
      )}
    </div>
  )
}

export { Etapas }
