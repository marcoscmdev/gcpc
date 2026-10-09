const GRUPOS_PERSONAJE = [
  { tipo: 'HEROE', titulo: 'Héroes' },
  { tipo: 'VILLANO', titulo: 'Villanos' },
  { tipo: 'ANTIHEROE', titulo: 'Antihéroes' },
  { tipo: 'OTRO', titulo: 'Otros' },
]

function ListaPersonajes({ personajes, destacarNombres = false }) {
  if (!personajes || personajes.length === 0) return null

  return (
    <div>
      <p>Personajes:</p>
      <ul className="mt-1 space-y-1 pl-4">
        {GRUPOS_PERSONAJE.map(({ tipo, titulo }) => {
          const nombres = personajes
            .filter(p => p.tipo === tipo)
            .map(p => p.nombre)
            .sort((a, b) => a.localeCompare(b, 'es'))
          if (nombres.length === 0) return null
          return (
            <li key={tipo}>
              {titulo}: <span className={destacarNombres ? 'text-text' : ''}>{nombres.join(', ')}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { ListaPersonajes }
