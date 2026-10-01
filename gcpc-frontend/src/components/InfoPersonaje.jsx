import { useState } from 'react'
import { UserRound } from 'lucide-react'

function InfoPersonaje({ personaje, imagen }) {
  const [error, setError] = useState(false)
  const mostrarImagen = Boolean(imagen) && !error

  return (
    <div className="flex items-stretch gap-6 rounded-xl border border-border bg-bg p-4">
      <span className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-accent-hover bg-banner">
        {mostrarImagen ? (
          <img
            src={imagen}
            alt={personaje.nombre}
            onError={() => setError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <UserRound className="h-10 w-10 text-text-secondary" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-2xl font-bold text-text">{personaje.nombre}</h3>

        <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          Nombre real
        </p>
        <p className="text-sm text-text">{personaje.nombreReal || '—'}</p>

        <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          Descripción
        </p>
        <p className="text-sm text-text">{personaje.descripcion || '—'}</p>
      </div>
    </div>
  )
}

export { InfoPersonaje }
