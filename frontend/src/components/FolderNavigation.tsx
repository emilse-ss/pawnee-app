import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "Criaturas", to: "/", number: "01" },
  { label: "Avistamientos", to: "/avistamientos", number: "02" },
  { label: "Registrar avistamiento", to: "/avistamientos/nuevo", number: "03", action: true },
  { label: "Registrar criatura", to: "/criaturas/nueva", number: "04", action: true },
];

export function FolderNavigation() {
  const { pathname } = useLocation();

  function estaActiva(to: string) {
    if (to === "/") return pathname === "/" || (pathname.startsWith("/criaturas/") && pathname !== "/criaturas/nueva");
    if (to === "/avistamientos") return pathname === "/avistamientos";
    return pathname === to || (to === "/avistamientos/nuevo" && pathname.startsWith(to));
  }

  return (
    <nav className="folder-nav" aria-label="Navegación principal">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          className={`folder-tab${tab.action ? " folder-tab--action" : ""}`}
          to={tab.to}
          aria-current={estaActiva(tab.to) ? "page" : undefined}
          data-number={tab.number}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
