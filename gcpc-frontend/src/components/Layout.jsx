import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-brand-navy text-white text-center py-6">
        <h1 className="text-4xl font-bold">GCPC</h1>
        <h2 className="text-sm text-zinc-300">Gotham Comics Personal Collection</h2>
      </header>

      <main className="flex-1 px-4 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-surface text-brand-belt px-6 py-3 rounded-full shadow-lg">
        {/*menu*/}
        menú
      </nav>

      <footer className="text-center text-xs text-text-muted py-4">
        Desarrollado por Marcos CM · 2026 — Código y diseño de la aplicación.
        Batman y personajes relacionados son propiedad de DC Comics. Batman creado por Bob Kane y Bill Finger.
      </footer>
    </div>
  )
}

export { Layout }