function Parrilla({ items, renderItem, keyExtractor, mensajeVacio, anchoMinimo, anchoMaximo = '320px', circular = false, centrado = false }) {
  if (items.length === 0) {
    return <p className="text-text-secondary">{mensajeVacio}</p>
  }

  // centrado: mismas columnas que la rejilla por defecto, pero las filas incompletas quedan centradas.
  if (centrado && !anchoMinimo && !circular) {
    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
        {items.map(item => (
          <div
            key={keyExtractor(item)}
            className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-3rem)/3)] md:w-[calc((100%-4.5rem)/4)] xl:w-[calc((100%-7.5rem)/6)] 2xl:w-[calc((100%-10.5rem)/8)]"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    )
  }

  // circular: tarjetas redondas (personajes, estilos). 3 por fila en móvil y más según crece la pantalla.
  if (circular) {
    return (
      <div className="grid grid-cols-3 justify-items-center gap-3 sm:grid-cols-4 sm:gap-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {items.map(item => (
          <div key={keyExtractor(item)} className="w-full">{renderItem(item)}</div>
        ))}
      </div>
    )
  }

  // Sin anchoMinimo: columnas por breakpoint (2 en móvil, hasta 8 en pantallas muy anchas).
  // Con anchoMinimo: columnas automáticas según ese ancho (tarjetas circulares, fichas de info...).
  if (!anchoMinimo) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {items.map(item => (
          <div key={keyExtractor(item)}>{renderItem(item)}</div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${anchoMinimo}, ${anchoMaximo}))`,
        justifyContent: 'center',
      }}
    >
      {items.map(item => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}

export { Parrilla }
