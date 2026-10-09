import { Etiqueta } from './Etiqueta.jsx'

function ListaGcd({ titulo, items }) {
  const tengo = items.filter(i => i.loTengo).length
  const faltan = items.filter(i => !i.loTengo)

  const porSerie = []
  for (const item of faltan) {
    const ultimo = porSerie[porSerie.length - 1]
    if (ultimo && ultimo.serie === item.serie) ultimo.items.push(item)
    else porSerie.push({ serie: item.serie, items: [item] })
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold uppercase tracking-widest text-accent">{titulo}</h2>
        <p className="text-sm text-text-secondary">
          Tienes <span className="text-text">{tengo}</span> de <span className="text-text">{items.length}</span>
          {' · '}te faltan <span className="text-text">{faltan.length}</span>
        </p>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-text-secondary">Esta etapa no tiene números de GCD asociados</p>
      ) : faltan.length === 0 ? (
        <p className="mt-4 text-sm text-text-secondary">No te falta ninguno</p>
      ) : (
        <div className="mt-4 space-y-4">
          {porSerie.map(({ serie, items: lista }) => (
            <div key={serie}>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-text-secondary">{serie}</h3>
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {lista.map((comic) => (
                  <div
                    key={comic.gcdIssueId}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-banner p-3"
                  >
                    <div>
                      <h4 className="font-sans text-lg text-text">
                        {comic.serie} #{comic.numero}{comic.anio ? ` (${comic.anio})` : ''}
                      </h4>
                      {comic.titulo && <p className="text-sm text-text-secondary">{comic.titulo}</p>}
                    </div>
                    <Etiqueta texto="Te falta" tono="danger" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { ListaGcd }
