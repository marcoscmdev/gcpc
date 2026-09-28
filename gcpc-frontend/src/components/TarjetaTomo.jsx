import { TarjetaObra } from './TarjetaObra.jsx'

function TarjetaTomo({ tomo }) {
  const subtitulo = [tomo.editorial, tomo.anhoEdicion].filter(Boolean).join(' — ')

  return (
    <TarjetaObra
      imagen={tomo.coverPath}
      alt={tomo.nombre}
      titulo={tomo.nombre}
      subtitulo={subtitulo}
      enlace={`/tomos/${tomo.id}`}
      tipo="TOMO"
    />
  )
}

export { TarjetaTomo }
