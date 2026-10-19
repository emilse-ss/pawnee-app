import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "Criaturas", to: "/", number: "01" },
  { label: "Avistamientos", to: "/avistamientos", number: "02" },
  { label: "Registrar avistamiento", to: "/avistamientos/nuevo", number: "03", action: true },
  { label: "Registrar criatura", to: "/criaturas/nueva", number: "04", action: true },
];

export function FolderNavigation() {
  const { pathname } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function estaActiva(to: string) {
    if (to === "/") return pathname === "/" || (pathname.startsWith("/criaturas/") && pathname !== "/criaturas/nueva");
    if (to === "/avistamientos") return pathname === "/avistamientos";
    return pathname === to || (to === "/avistamientos/nuevo" && pathname.startsWith(to));
  }

  const pestaniaActiva = tabs.find((tab) => estaActiva(tab.to)) ?? tabs[0];

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  return (
    <nav
      className="folder-nav"
      aria-label="Navegación principal"
      onKeyDown={(evento) => {
        if (evento.key === "Escape" && menuAbierto) {
          setMenuAbierto(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <button
        ref={toggleRef}
        className="folder-mobile-toggle"
        type="button"
        aria-expanded={menuAbierto}
        aria-controls="folder-tabs"
        onClick={() => setMenuAbierto((abierto) => !abierto)}
        data-number={pestaniaActiva.number}
      >
        {pestaniaActiva.label}<span aria-hidden="true">⌄</span>
      </button>
      <div id="folder-tabs" className={`folder-tabs${menuAbierto ? " folder-tabs--open" : ""}`}>
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            className={`folder-tab${tab.action ? " folder-tab--action" : ""}`}
            to={tab.to}
            aria-current={estaActiva(tab.to) ? "page" : undefined}
            data-number={tab.number}
            onClick={() => setMenuAbierto(false)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
