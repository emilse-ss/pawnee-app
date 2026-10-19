/**
 * paginas/ListaAvistamientos.tsx
 * -----------------------------------
 * Lista TODOS los avistamientos. Como el backend usa populate("criatura"),
 * cada avistamiento.criatura ya es el objeto completo.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eliminarAvistamiento, obtenerAvistamientos } from "../api/avistamientosApi";
import { Avistamiento } from "../tipos";
import { Aviso } from "../components/ui/Aviso";
import { Boton } from "../components/ui/Boton";
import { Tarjeta } from "../components/ui/Tarjeta";
import { ConfirmacionModal } from "../components/ui/ConfirmacionModal";
import { SectionIllustration } from "../components/SectionIllustration";

export function ListaAvistamientos() {
  const [avistamientos, setAvistamientos] = useState<Avistamiento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avistamientoPendiente, setAvistamientoPendiente] = useState<string | null>(null);

  function cargar() {
    setCargando(true);
    setError(null);
    obtenerAvistamientos()
      .then(setAvistamientos)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Error al cargar los avistamientos."))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargar();
  }, []);

  async function confirmarEliminar() {
    if (!avistamientoPendiente) return;
    try {
      await eliminarAvistamiento(avistamientoPendiente);
      setAvistamientoPendiente(null);
      cargar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el avistamiento.");
      setAvistamientoPendiente(null);
    }
  }

  return (
    <Tarjeta variante="lamina">
      <div className="section-heading">
        <h1>Avistamientos registrados</h1>
        <SectionIllustration kind="sightings" />
      </div>

      {cargando && <Aviso>Cargando avistamientos...</Aviso>}
      {!cargando && error && <Aviso variante="error">Error: {error}</Aviso>}
      {!cargando && !error && avistamientos.length === 0 && <Aviso variante="vacio">Todavía no hay avistamientos registrados.</Aviso>}

      {!cargando && !error && avistamientos.length > 0 && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Criatura</th>
              <th>Testigo</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {avistamientos.map((avistamiento) => (
              <tr key={avistamiento._id}>
                <td>{avistamiento.fecha.slice(0, 10)}</td>
                <td>
                  <Link className="link-accion link-accion--ver" to={`/criaturas/${avistamiento.criatura._id}`}>{avistamiento.criatura.nombre}</Link>
                </td>
                <td>{avistamiento.testigo}</td>
                <td>{avistamiento.ubicacion}</td>
                <td>
                  <Boton type="button" variante="peligro" tamano="sm" onClick={() => setAvistamientoPendiente(avistamiento._id)}>
                    Eliminar
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {avistamientoPendiente && (
        <ConfirmacionModal
          mensaje="¿Eliminar este avistamiento?"
          onCancelar={() => setAvistamientoPendiente(null)}
          onConfirmar={confirmarEliminar}
        />
      )}
    </Tarjeta>
  );
}
