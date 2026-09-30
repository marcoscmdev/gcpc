function Parrilla({ items, renderItem, keyExtractor, mensajeVacio, anchoMinimo = '220px' }) {
  if (items.length === 0) {
    return <p className="text-text-secondary">{mensajeVacio}</p>
  }

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${anchoMinimo}, 1fr))` }}
    >
      {items.map(item => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}

export { Parrilla }
