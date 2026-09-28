import { TarjetaTomo } from './TarjetaTomo.jsx'
import { TarjetaComic } from './TarjetaComic.jsx'
import { Parrilla } from './Parrilla.jsx'

function ResultadosBusqueda({ comics }) {
  const tomos = Object.values(
    comics.reduce((acc, comic) => {
      comic.tomos.forEach(tomo => {
        if (!acc[tomo.id]) acc[tomo.id] = tomo
      })
      return acc
    }, {})
  )

  const grapas = comics.filter(comic => comic.tomos.length === 0)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-xl text-text mb-3">Tomos</h2>
        <Parrilla
          items={tomos}
          keyExtractor={(tomo) => tomo.id}
          renderItem={(tomo) => <TarjetaTomo tomo={tomo} />}
          mensajeVacio="No hay tomos con este resultado"
        />
      </section>

      <section>
        <h2 className="font-display text-xl text-text mb-3">Grapas</h2>
        <Parrilla
          items={grapas}
          keyExtractor={(comic) => comic.id}
          renderItem={(comic) => <TarjetaComic comic={comic} />}
          mensajeVacio="No hay grapas sueltas con este resultado"
        />
      </section>
    </div>
  )
}

export { ResultadosBusqueda }
