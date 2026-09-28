import { TarjetaObra } from './TarjetaObra.jsx'

function TarjetaComic({ comic }) {
  return (
    <TarjetaObra
      imagen={comic.coverPath}
      alt={comic.nombre}
      titulo={`${comic.nombre} #${comic.numero}`}
      subtitulo={comic.anho ? `Año ${comic.anho}` : 'Año sin especificar'}
      enlace={`/comics/${comic.id}`}
      tipo="GRAPA"
    />
  )
}

export { TarjetaComic }
