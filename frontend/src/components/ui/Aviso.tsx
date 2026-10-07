import { HTMLAttributes } from "react";

interface AvisoProps extends HTMLAttributes<HTMLParagraphElement> {
  variante?: "info" | "error" | "vacio";
}

export function Aviso({ variante = "info", className = "", ...props }: AvisoProps) {
  return <p className={`aviso aviso--${variante} ${className}`.trim()} {...props} />;
}