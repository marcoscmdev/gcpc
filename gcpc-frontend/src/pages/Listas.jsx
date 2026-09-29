import { NavLink, Outlet } from 'react-router-dom'
import { TituloPagina } from '../components/TituloPagina.jsx'

function Listas() {
  const clasePestaña = ({ isActive }) =>
    isActive ? 'text-accent border-b-2 border-accent pb-2' : 'text-text-secondary pb-2'

  return (
    <div>
      <TituloPagina
        titulo="Listas"
        descripcion="Explora por estilo, arco argumental o etapa."
      />

      <nav className="flex gap-6 border-b border-border mb-6">
        <NavLink to="estilos" className={clasePestaña}>Estilos</NavLink>
        <NavLink to="arcos" className={clasePestaña}>Arcos</NavLink>
        <NavLink to="etapas" className={clasePestaña}>Etapas</NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export { Listas }
