import { Link } from 'react-router-dom'

function TarjetaObra({ imagen, alt, titulo, subtitulo, enlace, tipo }) {
  const esTomo = tipo === 'TOMO'

  return (
    <Link
      to={enlace}
      className="block rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
    >
      {tipo && (
        <span
          className={`mb-3 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
            esTomo
              ? 'bg-state-info-bg text-state-info-text'
              : 'bg-state-warning-bg text-state-warning-text'
          }`}
        >
          {tipo}
        </span>
      )}

      <img
        src={imagen ?? '/img/portada-generica.jpg'}
        alt={alt}
        className="aspect-[2/3] w-full rounded-lg object-cover"
      />

      <h3 className="mt-3 truncate font-display text-lg font-bold text-text">{titulo}</h3>
      {subtitulo && <p className="truncate text-sm text-text-secondary">{subtitulo}</p>}
    </Link>
  )
}

export { TarjetaObra }
