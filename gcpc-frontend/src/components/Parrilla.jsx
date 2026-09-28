function Parrilla({ items, renderItem, keyExtractor, mensajeVacio }) {
  if (items.length === 0) {
    return <p className="text-text-secondary">{mensajeVacio}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(item => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}

export { Parrilla }
