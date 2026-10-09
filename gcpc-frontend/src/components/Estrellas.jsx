import { Star } from 'lucide-react'

function Estrellas({ valor, maximo = 5 }) {
  if (valor == null) return <span className="text-text">Sin puntuar</span>

  return (
    <span className="inline-flex items-center gap-0.5 align-middle" role="img" aria-label={`${valor} de ${maximo} estrellas`}>
      {Array.from({ length: maximo }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < valor ? 'text-accent' : 'text-text-secondary/40'}
          fill={i < valor ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

export { Estrellas }
