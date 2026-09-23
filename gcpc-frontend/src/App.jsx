import './App.css'
import { NavLink } from 'react-router-dom'
import { Inicio } from './pages/Inicio.jsx'
import { Personajes } from './pages/Personajes.jsx'
import { Personas } from './pages/Personas.jsx'
import { Estilos } from './pages/Estilos.jsx'
import { Arcos } from './pages/Arcos.jsx'
import { Etapas } from './pages/Etapas.jsx'
import { Archivo } from './pages/Archivo.jsx'
import { TomoDetalle } from './pages/TomoDetalle.jsx'
import { Routes, Route } from 'react-router-dom'
function App() {
  
  return (
    <>
    <h1>GCPC</h1>



     <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Personajes" element={<Personajes />} />
      <Route path="/Personas" element={<Personas />} />
      <Route path="/Estilos" element={<Estilos />} />
      <Route path="/Arcos" element={<Arcos />} />
      <Route path="/Etapas" element={<Etapas />} />
      <Route path="/Archivo" element={<Archivo />} />
      <Route path="/tomos/:id" element={<TomoDetalle />} />
    </Routes>
     <nav>
        <NavLink to="/Inicio">Inicio |</NavLink>
        <NavLink to="/Personajes">Personajes |</NavLink>
        <NavLink to="/Personas">Personas |</NavLink>
        <NavLink to="/Estilos">Estilos |</NavLink>
        <NavLink to="/Arcos">Arcos |</NavLink>
        <NavLink to="/Etapas">Etapas |</NavLink>
        <NavLink to="/Archivo">Archivo |</NavLink>
      </nav>
    
    </>
  )
}

export default App
