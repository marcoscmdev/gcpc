import { NavLink, Outlet } from 'react-router-dom'

function Listas() {
  const clasePestaña = ({ isActive }) =>
    isActive ? 'text-accent border-b-2 border-accent pb-2' : 'text-text-secondary pb-2'

  return (
    <div>
      <h1 className="font-display text-2xl text-text mb-4">Listas</h1>

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