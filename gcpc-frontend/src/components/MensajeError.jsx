function MensajeError({ codigo, mensaje, className = '' }) {
  return (
    <div className={`rounded-lg bg-state-warning-bg p-3 text-sm text-state-warning-text ${className}`}>
      <p className="font-medium">Error {codigo}</p>
      <p>{mensaje}</p>
    </div>
  )
}

export { MensajeError }
