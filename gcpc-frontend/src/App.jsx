import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Inicio } from './pages/Inicio.jsx'
import { Personajes } from './pages/Personajes.jsx'
import { Personas } from './pages/Personas.jsx'
import { Estilos } from './pages/Estilos.jsx'
import { Arcos } from './pages/Arcos.jsx'
import { Etapas } from './pages/Etapas.jsx'
import { Archivo } from './pages/Archivo.jsx'
import { TomoDetalle } from './pages/TomoDetalle.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="Inicio" element={<Inicio />} />
        <Route path="Personajes" element={<Personajes />} />
        <Route path="Personas" element={<Personas />} />
        <Route path="Estilos" element={<Estilos />} />
        <Route path="Arcos" element={<Arcos />} />
        <Route path="Etapas" element={<Etapas />} />
        <Route path="Archivo" element={<Archivo />} />
        <Route path="tomos/:id" element={<TomoDetalle />} />
      </Route>
    </Routes>
  )
}

export default App