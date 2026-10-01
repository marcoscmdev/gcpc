function TarjetaInfo({ nombre, subtitulo, meta, descripcion, seleccionado, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full w-full flex-col items-start gap-1.5 rounded-lg border p-4 text-left transition hover:scale-[1.02] ${
        seleccionado
          ? 'border-accent-hover bg-banner'
          : 'border-border bg-surface hover:border-accent-hover'
      }`}
    >
      <span className={`font-display text-lg font-medium ${seleccionado ? 'text-accent-hover' : 'text-text'}`}>
        {nombre}
      </span>
      {subtitulo && (
        <span className="text-base text-text-muted">{subtitulo}</span>
      )}
      {meta && (
        <span className="text-base text-text-secondary">{meta}</span>
      )}
      {descripcion && (
        <span className="line-clamp-2 text-base text-text-secondary">{descripcion}</span>
      )}
    </button>
  )
}

export { TarjetaInfo }
