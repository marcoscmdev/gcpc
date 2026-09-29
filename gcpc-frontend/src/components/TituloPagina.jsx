function TituloPagina({ titulo, descripcion }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-[26px] font-bold text-text">{titulo}</h1>
      {descripcion && <p className="mt-1 text-sm text-text-secondary">{descripcion}</p>}
    </div>
  )
}

export { TituloPagina }
