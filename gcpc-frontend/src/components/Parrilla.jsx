function Parrilla({ items, renderItem, keyExtractor, mensajeVacio }) {
  if (items.length === 0) {
    return <p className="text-text-secondary">{mensajeVacio}</p>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      {items.map(item => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}

export { Parrilla }
