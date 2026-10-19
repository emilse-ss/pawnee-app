import { HTMLAttributes, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Aviso } from "./Aviso";

interface TarjetaProps extends HTMLAttributes<HTMLDivElement> {
  variante?: "lamina" | "contenido";
  miga?: string;
}

function BarraContexto({ miga }: { miga?: string }) {
  const { pathname } = useLocation();
  const segmentos = pathname.split("/").filter(Boolean);
  const esInicio = pathname === "/";
  const rutaRegreso = pathname === "/avistamientos/nuevo"
    ? "/avistamientos"
    : pathname === "/criaturas/nueva"
      ? "/"
      : pathname.endsWith("/editar")
        ? `/criaturas/${segmentos[1]}`
        : "/";
  const migas = pathname === "/"
    ? ["Criaturas"]
    : pathname === "/avistamientos"
      ? ["Avistamientos"]
      : pathname === "/avistamientos/nuevo"
        ? ["Avistamientos", "Registrar avistamiento"]
        : pathname === "/criaturas/nueva"
          ? ["Criaturas", "Registrar criatura"]
          : pathname.endsWith("/editar")
            ? ["Criaturas", "Editar criatura"]
            : ["Criaturas", miga ?? "Detalle"];

  return (
    <div className="context-bar">
      {esInicio ? <span /> : (
        <Link className="boton boton--secundario boton--sm context-back" to={rutaRegreso}>
          <span aria-hidden="true">←</span> Regresar
        </Link>
      )}
      <nav className="breadcrumbs" aria-label="Migas de navegación">
        {migas.map((miga, indice) => (
          <span key={miga} aria-current={indice === migas.length - 1 ? "page" : undefined}>
            {indice > 0 && <span className="breadcrumbs__separator"> / </span>}{miga}
          </span>
        ))}
      </nav>
    </div>
  );
}

export function Tarjeta({ variante = "contenido", className = "", children, ...props }: TarjetaProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const mensajeEnRuta = (location.state as { mensajeExito?: string } | null)?.mensajeExito;
  const [mensajeExito] = useState<string | null>(mensajeEnRuta ?? null);

  useEffect(() => {
    if (mensajeEnRuta) {
      navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
    }
  }, [location.pathname, location.search, mensajeEnRuta, navigate]);

  const { miga, ...atributos } = props;
  return (
    <div
      className={`tarjeta tarjeta--${variante} ${className}`.trim()}
      id={variante === "lamina" ? "main-content" : undefined}
      tabIndex={variante === "lamina" ? -1 : undefined}
      {...atributos}
    >
      {variante === "lamina" && <BarraContexto miga={miga} />}
      {variante === "lamina" && mensajeExito && <Aviso variante="exito">{mensajeExito}</Aviso>}
      {children}
    </div>
  );
}