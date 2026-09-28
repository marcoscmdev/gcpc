import { Link } from 'react-router-dom'

function TarjetaObra({ imagen, alt, titulo, subtitulo, enlace }) {
  return (
    <Link to={enlace} className="block rounded-xl bg-surface p-3 transition-colors hover:bg-surface-hover">
      <img
        src={imagen ?? '/img/portada-generica.jpg'}
        alt={alt}
        className="aspect-[2/3] w-full rounded-lg object-cover"
      />
      <h3 className="mt-2 truncate font-display text-sm text-text">{titulo}</h3>
      {subtitulo && <p className="truncate text-xs text-text-secondary">{subtitulo}</p>}
    </Link>
  )
}

export { TarjetaObra }
