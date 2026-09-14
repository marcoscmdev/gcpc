import './App.css'
import { NavLink } from 'react-router-dom'
import { Inicio } from './pages/inicio.jsx'
import { Personajes } from './pages/personajes.jsx'
import { Personas } from './pages/personas.jsx'
import { Estilos } from './pages/estilos.jsx'
import { Arcos } from './pages/arcos.jsx'
import { Etapas } from './pages/etapas.jsx'
import { Archivo } from './pages/Archivo.jsx'
import { Routes, Route } from 'react-router-dom'
function App() {
  

  return (
    <>
     <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Personajes" element={<Personajes />} />
      <Route path="/Personas" element={<Personas />} />
      <Route path="/Estilos" element={<Estilos />} />
      <Route path="/Arcos" element={<Arcos />} />
      <Route path="/Etapas" element={<Etapas />} />
      <Route path="/Archivo" element={<Archivo />} />

    </Routes>

    <h1>GCPC</h1>
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
