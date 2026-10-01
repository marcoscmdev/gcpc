import { useState, useEffect } from 'react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { Boton } from '../components/Boton.jsx'
import { Parrilla } from '../components/Parrilla.jsx'
import { TarjetaInfo } from '../components/TarjetaInfo.jsx'
import { MensajeError } from '../components/MensajeError.jsx'

function rangoAnhos(etapa) {
  if (!etapa.anhoInicio) return null
  if (!etapa.anhoFin) return `Desde ${etapa.anhoInicio}`
  return `${etapa.anhoInicio} – ${etapa.anhoFin}`
}

function Etapas() {
  const [etapas, setEtapas] = useState([])
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
    fetch(`${API_URL}/api/etapas`)
      .then(manejarRespuesta)
      .then(data => setEtapas(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(etapa) {
    setSeleccionado(etapa.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/etapas/buscar?nombre=${encodeURIComponent(etapa.nombre)}`)
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

  return (
    <div>
      <TituloPagina
        titulo="Etapas"
        descripcion="Filtra por etapa."
      />

      <Panel titulo="Selecciona una etapa">
        <Parrilla
          items={etapas}
          keyExtractor={(etapa) => etapa.id}
          anchoMinimo="220px"
          mensajeVacio="Todavía no tienes etapas registradas"
          renderItem={(etapa) => (
            <TarjetaInfo
              nombre={etapa.nombre}
              subtitulo={rangoAnhos(etapa)}
              seleccionado={seleccionado === etapa.id}
              onClick={() => handleSeleccionar(etapa)}
            />
          )}
        />

        {seleccionado && (
          <Boton className="mt-4" onClick={handleQuitarSeleccion}>Quitar selección</Boton>
        )}

        {cargando && <p className="mt-4 text-sm text-text-secondary">Buscando...</p>}
        {error && <MensajeError className="mt-4" codigo={error.codigo} mensaje={error.mensaje} />}
      </Panel>

      {buscado && !cargando && (
        <div className="mt-6">
          <ResultadosBusqueda comics={comics} />
        </div>
      )}
    </div>
  )
}

export { Etapas }
