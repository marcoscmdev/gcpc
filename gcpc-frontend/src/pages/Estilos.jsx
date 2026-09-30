import { useState, useEffect } from 'react'
import { Palette } from 'lucide-react'
import { API_URL } from '../config.js'
import { ResultadosBusqueda } from '../components/ResultadosBusqueda.jsx'
import { TituloPagina } from '../components/TituloPagina.jsx'
import { Panel } from '../components/Panel.jsx'
import { Boton } from '../components/Boton.jsx'
import { Parrilla } from '../components/Parrilla.jsx'
import { TarjetaCircular } from '../components/TarjetaCircular.jsx'
import { MensajeError } from '../components/MensajeError.jsx'
import { slugificar } from '../utils/texto.js'

function Estilos() {
  const [estilos, setEstilos] = useState([])
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
    fetch(`${API_URL}/api/estilos`)
      .then(manejarRespuesta)
      .then(data => setEstilos(data))
      .catch(err => setError(err.codigo ? err : { codigo: '—', mensaje: 'No se pudo conectar con el servidor' }))
  }, [])

  function handleSeleccionar(estilo) {
    setSeleccionado(estilo.id)
    setCargando(true)
    setError(null)
    fetch(`${API_URL}/api/estilos/buscar?nombre=${encodeURIComponent(estilo.nombre)}`)
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
        titulo="Estilos"
        descripcion="Encuentra ejemplares por estilo de dibujo."
      />

      <Panel titulo="Selecciona un estilo">
        <Parrilla
          items={estilos}
          keyExtractor={(estilo) => estilo.id}
          anchoMinimo="100px"
          mensajeVacio="Todavía no tienes estilos registrados"
          renderItem={(estilo) => (
            <TarjetaCircular
              imagen={`/img/estilos/${slugificar(estilo.nombre)}.jpg`}
              alt={estilo.nombre}
              nombre={estilo.nombre}
              seleccionado={seleccionado === estilo.id}
              onClick={() => handleSeleccionar(estilo)}
              IconoRespaldo={Palette}
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

export { Estilos }
