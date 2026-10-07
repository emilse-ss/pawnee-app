import { ButtonHTMLAttributes } from "react";

type Variante = "primario" | "secundario" | "acento" | "azul" | "peligro" | "exito";
type Tamano = "sm" | "md" | "lg";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
}

export function Boton({ variante = "primario", tamano = "md", className = "", ...props }: BotonProps) {
  return <button className={`boton boton--${variante} boton--${tamano} ${className}`.trim()} {...props} />;
}