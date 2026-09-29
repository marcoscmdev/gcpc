const TONOS = {
  success: 'bg-state-success-bg text-state-success-text',
  warning: 'bg-state-warning-bg text-state-warning-text',
  neutral: 'bg-state-neutral-bg text-state-neutral-text',
  info: 'bg-state-info-bg text-state-info-text',
  danger: 'bg-state-danger-bg text-state-danger-text',
}

function Etiqueta({ texto, tono = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${TONOS[tono]} ${className}`}
    >
      {texto}
    </span>
  )
}

export { Etiqueta }
