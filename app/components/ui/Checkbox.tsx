import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
  size?: "sm" | "md";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      className = "",
      labelClassName = "",
      size = "md",
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substring(2, 11)}`;
    const boxSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    const checkSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

    return (
      <label
        htmlFor={checkboxId}
        className={`group inline-flex cursor-pointer select-none items-start gap-2.5 ${className}`.trim()}
      >
        <span
          className={`relative inline-flex ${boxSize} shrink-0 items-center justify-center`}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="peer absolute inset-0 !m-0 !min-h-0 !min-w-0 cursor-pointer appearance-none rounded border-2 border-text-secondary/40 bg-background-primary !p-0 transition-colors duration-150 checked:border-primary-blue checked:bg-primary-blue hover:border-primary-blue/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
          <svg
            className={`pointer-events-none absolute ${checkSize} stroke-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8.5L6.5 12L13 4.5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {(label || description) && (
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            {label && (
              <span
                className={`text-sm font-medium text-text-primary ${labelClassName}`.trim()}
              >
                {label}
              </span>
            )}
            {description && (
              <span className="mt-0.5 text-xs text-text-secondary">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
