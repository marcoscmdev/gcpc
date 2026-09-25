import { Outlet } from "react-router-dom";
import escudo from '../assets/gcpc_escudo.svg'
import { Nav } from './Nav.jsx'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header className="bg-banner flex items-center gap-4 px-6 py-5">
        <img src={escudo} alt="Escudo GCPC" className="h-[110px] w-auto" />
        <div className="text-left">
          <h1 className="font-display text-4xl font-bold tracking-wide text-text sm:text-5xl">
            GCPC
          </h1>
          <h2 className="text-sm tracking-[0.25em] text-text-secondary sm:text-base">
            GOTHAM CITY PERSONAL COLLECTION
          </h2>
        </div>
      </header>

      <main className="flex-1 px-6 pb-28 pt-6">
        <Outlet />
      </main>

      <Nav />

    </div>
  );
}

export { Layout };
