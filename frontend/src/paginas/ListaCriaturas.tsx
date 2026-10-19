/**
 * paginas/ListaCriaturas.tsx
 * ------------------------------
 * Página de solo lectura: lista todas las criaturas en una <table> de
 * HTML plano, sin ninguna clase de CSS. Maneja los 3 estados: loading,
 * error y empty.
 */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerCriaturas } from "../api/criaturasApi";
import { obtenerAvistamientos } from "../api/avistamientosApi";
import { Criatura, TipoCriatura, TIPOS_CRIATURA } from "../tipos";
import { Aviso } from "../components/ui/Aviso";
import { Tarjeta } from "../components/ui/Tarjeta";
import { SectionIllustration } from "../components/SectionIllustration";

export function ListaCriaturas() {
  const navigate = useNavigate();
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [totales, setTotales] = useState({ criaturas: "—", avistamientos: "—" });
  const [filtroTipo, setFiltroTipo] = useState<TipoCriatura | "">("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([obtenerCriaturas(), obtenerAvistamientos()])
      .then(([listaCriaturas, listaAvistamientos]) => setTotales({
        criaturas: String(listaCriaturas.length),
        avistamientos: String(listaAvistamientos.length),
      }))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setCargando(true);
    setError(null);

    obtenerCriaturas(filtroTipo || undefined)
      .then(setCriaturas)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Error al cargar las criaturas.");
      })
      .finally(() => setCargando(false));
  }, [filtroTipo]);

  return (
    <Tarjeta variante="lamina">
      <span className="kicker">Archivo oficial · Departamento de Parques</span>
      <div className="section-heading">
        <h1>Criaturas de Pawnee</h1>
        <SectionIllustration kind="creatures" />
      </div>

      <section className="intro" aria-label="Introducción">
        <p><span className="intro__lead">Este archivo</span> reúne las criaturas reportadas en Pawnee y los avistamientos registrados por el Departamento de Parques. Explora el catálogo, consulta reportes o registra nuevos hallazgos.</p>
        <div className="intro__stats">
          <div className="stat"><strong>{totales.criaturas}</strong><span>Criaturas registradas</span></div>
          <div className="stat"><strong>{totales.avistamientos}</strong><span>Avistamientos registrados</span></div>
        </div>
      </section>

      <div className="intro__actions">
        <a className="boton" href="#catalogo">Explorar criaturas</a>
        <Link className="boton boton--acento" to="/avistamientos">Ver avistamientos</Link>
        <Link className="boton boton--secundario" to="/avistamientos/nuevo">Registrar avistamiento</Link>
      </div>

      <p>
        <Link to="/criaturas/nueva">Registrar criatura nueva</Link>
        {" · "}
        <Link to="/avistamientos">Ver avistamientos</Link>
      </p>

      <h2 id="catalogo">Catálogo de criaturas</h2>
      <label htmlFor="filtro-tipo">Filtrar por tipo: </label>
      <select
        id="filtro-tipo"
        value={filtroTipo}
        onChange={(evento) => setFiltroTipo(evento.target.value as TipoCriatura | "")}
      >
        <option value="">Todos los tipos</option>
        {TIPOS_CRIATURA.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {cargando && <Aviso>Cargando criaturas...</Aviso>}
      {!cargando && error && <Aviso variante="error">Ocurrió un error: {error}</Aviso>}
      {!cargando && !error && criaturas.length === 0 && <Aviso variante="vacio">Todavía no hay criaturas registradas.</Aviso>}

      {!cargando && !error && criaturas.length > 0 && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Nivel de peligro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {criaturas.map((criatura) => (
              <tr
                key={criatura._id}
                className="clickable-row"
                tabIndex={0}
                aria-label={`Ver ${criatura.nombre}`}
                onClick={() => navigate(`/criaturas/${criatura._id}`)}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    navigate(`/criaturas/${criatura._id}`);
                  }
                }}
              >
                <td>{criatura.nombre}</td>
                <td>{criatura.tipo}</td>
                <td>{criatura.nivelPeligro}</td>
                <td>{criatura.estado}</td>
                <td>
                  <Link onClick={(evento) => evento.stopPropagation()} to={`/criaturas/${criatura._id}`}>Ver</Link>
                  {" | "}
                  <Link onClick={(evento) => evento.stopPropagation()} to={`/criaturas/${criatura._id}/editar`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Tarjeta>
  );
}
