import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, fullWidth = false, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      "px-3 py-2 md:py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-background-dark-secondary text-text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-sm md:text-base";
    const errorClasses = error
      ? "border-system-error-dark focus:ring-system-error-dark focus:border-system-error-dark"
      : "border-neutral-surface-variant focus:ring-primary-blue-dark focus:border-primary-blue-dark";
    const widthClass = fullWidth ? "w-full" : "";

    const classes = `${baseClasses} ${errorClasses} ${widthClass} ${className}`.trim();

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-base font-medium text-text-primary-dark md:text-sm"
          >
            {label}
            {props.required && <span className="ml-1 text-system-error-dark">*</span>}
          </label>
        )}
        <input ref={ref} id={inputId} className={classes} {...props} />
        {error && (
          <p className="mt-1 text-sm text-system-error-dark" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
