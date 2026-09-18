interface FieldFeedbackProps {
  error?: string;
  hint: string;
}

/** Mensagem de erro (quando houver) e dica exibidas abaixo de um campo de formulário. */
export function FieldFeedback({ error, hint }: FieldFeedbackProps) {
  return (
    <>
      {error && (
        <div role="alert" className="mt-1 text-sm text-system-error">
          {error}
        </div>
      )}
      <div className="mt-1 text-xs text-text-secondary">{hint}</div>
    </>
  );
}
