/**
 * App.tsx
 * -------
 * Configura las 6 rutas de React Router.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FolderNavigation } from "./components/FolderNavigation";
import { ListaCriaturas } from "./paginas/ListaCriaturas";
import { DetalleCriatura } from "./paginas/DetalleCriatura";
import { FormularioCriatura } from "./paginas/FormularioCriatura";
import { ListaAvistamientos } from "./paginas/ListaAvistamientos";
import { FormularioAvistamiento } from "./paginas/FormularioAvistamiento";

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <FolderNavigation />
      <Routes>
        <Route path="/" element={<ListaCriaturas />} />
        <Route path="/criaturas/nueva" element={<FormularioCriatura />} />
        <Route path="/criaturas/:id" element={<DetalleCriatura />} />
        <Route path="/criaturas/:id/editar" element={<FormularioCriatura />} />
        <Route path="/avistamientos" element={<ListaAvistamientos />} />
        <Route path="/avistamientos/nuevo" element={<FormularioAvistamiento />} />
      </Routes>
    </BrowserRouter>
  );
}
