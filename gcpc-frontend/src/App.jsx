import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { Index } from "./pages/Index.jsx";
import { Personajes } from "./pages/Personajes.jsx";
import { Personas } from "./pages/Personas.jsx";
import { Estilos } from "./pages/Estilos.jsx";
import { Arcos } from "./pages/Arcos.jsx";
import { Etapas } from "./pages/Etapas.jsx";
import { Archivo } from "./pages/Archivo.jsx";
import { TomoDetalle } from "./pages/TomoDetalle.jsx";
import { Listas } from "./pages/Listas.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="personajes" element={<Personajes />} />
        <Route path="personas" element={<Personas />} />
        <Route path="listas" element={<Listas />}>
          <Route index element={<Navigate to="estilos" replace />} />
          <Route path="estilos" element={<Estilos />} />
          <Route path="arcos" element={<Arcos />} />
          <Route path="etapas" element={<Etapas />} />
        </Route>
        <Route path="archivo" element={<Archivo />} />
        <Route path="tomos/:id" element={<TomoDetalle />} />
      </Route>
    </Routes>
  );
}

export default App;
