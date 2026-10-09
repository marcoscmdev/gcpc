import { TarjetaObra } from './TarjetaObra.jsx'

function esGrapa(comic) {
  if (comic.esGrapa !== undefined) return comic.esGrapa
  if (comic.tomos) return comic.tomos.length === 0
  return false
}

function TarjetaComic({ comic }) {
  return (
    <TarjetaObra
      imagen={comic.coverPath}
      alt={comic.nombre}
      titulo={`${comic.nombre} #${comic.numero}`}
      subtitulo={comic.anho ? `Año ${comic.anho}` : 'Año sin especificar'}
      enlace={`/comics/${comic.id}`}
      tipo={esGrapa(comic) ? 'GRAPA' : 'COMIC'}
    />
  )
}

export { TarjetaComic }
