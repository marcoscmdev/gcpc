import { useState } from 'react'
import { UserRound } from 'lucide-react'

function TarjetaCircular({ imagen, alt, nombre, seleccionado, onClick, IconoRespaldo = UserRound }) {
  const [error, setError] = useState(false)
  const mostrarImagen = Boolean(imagen) && !error

  return (
    <button
      type="button"
      onClick={onClick}
      title={nombre}
      className="group flex w-full flex-col items-center gap-2 text-center"
    >
      <span
        className={`flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full border-2 transition group-hover:scale-110 ${
          seleccionado
            ? 'border-accent-hover bg-banner'
            : 'border-border bg-surface hover:border-accent-hover'
        }`}
      >
        {mostrarImagen ? (
          <img
            src={imagen}
            alt={alt}
            onError={() => setError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <IconoRespaldo className="h-8 w-8 text-text-secondary" />
        )}
      </span>
      <span
        className={`max-w-[7rem] truncate text-sm transition group-hover:scale-110 ${
          seleccionado ? 'text-accent-hover' : 'text-text'
        }`}
      >
        {nombre}
      </span>
    </button>
  )
}

export { TarjetaCircular }
