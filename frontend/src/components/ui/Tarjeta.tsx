import { HTMLAttributes } from "react";

interface TarjetaProps extends HTMLAttributes<HTMLDivElement> {
  variante?: "lamina" | "contenido";
}

export function Tarjeta({ variante = "contenido", className = "", ...props }: TarjetaProps) {
  return <div className={`tarjeta tarjeta--${variante} ${className}`.trim()} {...props} />;
}