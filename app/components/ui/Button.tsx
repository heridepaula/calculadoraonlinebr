import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", fullWidth = false, children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variantClasses = {
      primary:
        "bg-primary-blue-dark text-white hover:bg-primary-blue focus:ring-primary-blue-dark hover:shadow-lg hover:scale-105",
      success:
        "bg-growth-green-dark text-white hover:bg-growth-green focus:ring-growth-green-dark hover:shadow-lg hover:scale-105",
      outline:
        "border border-primary-blue-dark bg-transparent text-primary-blue-dark hover:bg-neutral-surface-dark focus:ring-primary-blue-dark",
      ghost:
        "bg-transparent text-text-primary-dark hover:bg-neutral-surface-dark focus:ring-primary-blue-dark",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm min-h-[36px]",
      md: "px-4 py-2 text-base min-h-[44px]",
      lg: "px-6 py-3 text-lg min-h-[52px]",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const classes =
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
