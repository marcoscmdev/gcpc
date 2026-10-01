import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function SeccionColapsable({ titulo, children, abiertoPorDefecto = true, className = '' }) {
  const [abierto, setAbierto] = useState(abiertoPorDefecto)

  return (
    <div className={`rounded-xl border border-border bg-surface p-6 ${className}`}>
      <button
        type="button"
        onClick={() => setAbierto((valor) => !valor)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-base font-bold uppercase tracking-widest text-accent">{titulo}</h2>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-secondary transition-transform ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {abierto && <div className="mt-4">{children}</div>}
    </div>
  )
}

export { SeccionColapsable }
