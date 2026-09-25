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
    <nav className="fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-surface px-3 py-2 shadow-lg">
      {enlaces.map(({ to, label, Icono }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition-colors ${
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
