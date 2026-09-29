function ListaSeleccion({ items, seleccionadoId, onSeleccionar, name, getId = (i) => i.id, getLabel = (i) => i.nombre }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const id = getId(item)
        const activo = seleccionadoId === id
        return (
          <label
            key={id}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-base transition-colors ${
              activo
                ? 'border-accent bg-state-warning-bg text-state-warning-text'
                : 'border-border bg-bg text-text-secondary hover:text-text'
            }`}
          >
            <input
              type="radio"
              name={name}
              className="sr-only"
              checked={activo}
              onChange={() => onSeleccionar(item)}
            />
            {getLabel(item)}
          </label>
        )
      })}
    </div>
  )
}

export { ListaSeleccion }
