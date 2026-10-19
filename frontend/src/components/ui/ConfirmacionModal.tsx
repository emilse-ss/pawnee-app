import { Boton } from "./Boton";

interface ConfirmacionModalProps {
  mensaje: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export function ConfirmacionModal({ mensaje, onCancelar, onConfirmar }: ConfirmacionModalProps) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCancelar();
      }}
      onKeyDown={(evento) => {
        if (evento.key === "Escape") onCancelar();
        if (evento.key === "Tab") {
          const controles = evento.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
          const primero = controles[0];
          const ultimo = controles[controles.length - 1];
          if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo?.focus();
          } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero?.focus();
          }
        }
      }}
    >
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-label={mensaje}>
        <p>{mensaje}</p>
        <div className="form-actions">
          <Boton autoFocus type="button" variante="secundario" onClick={onCancelar}>Cancelar</Boton>
          <Boton type="button" variante="peligro" onClick={onConfirmar}>Eliminar</Boton>
        </div>
      </section>
    </div>
  );
}
