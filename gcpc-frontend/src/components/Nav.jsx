import { NavLink } from "react-router-dom";
import { Home, IdCard, UserSearch, Layers, Archive } from "lucide-react";

const enlaces = [
  { to: "/", label: "INICIO", Icono: Home },
  { to: "/personajes", label: "PERSONAJES", Icono: IdCard },
  { to: "/personas", label: "AUTORES", Icono: UserSearch },
  { to: "/listas", label: "LISTAS", Icono: Layers },
  { to: "/archivo", label: "ARCHIVO", Icono: Archive },
];

function Nav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-around gap-1 bg-surface px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:justify-start sm:rounded-full sm:px-3 sm:py-2">
      {enlaces.map(({ to, label, Icono }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs sm:px-4 transition-colors ${
              isActive
                ? "bg-state-warning-bg text-state-warning-text font-medium"
                : "text-text-secondary hover:text-text"
            }`
          }
        >
          <Icono size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export { Nav };
