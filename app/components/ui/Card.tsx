import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "subtle" | "interactive";
  noBorder?: boolean;
}

const Card = ({ 
  className = "", 
  children, 
  padding = "md", 
  variant = "default",
  noBorder = false,
  ...props 
}: CardProps) => {
  const baseClasses = "rounded-lg transition-all duration-300";
  
  const variantClasses = {
    default: "bg-card-bg border border-light shadow-default hover:shadow-lg",
    elevated: "bg-card-bg border-0 shadow-lg hover:shadow-xl",
    subtle: "bg-card-bg/50 border border-light/50 shadow-sm hover:shadow-md backdrop-blur-sm",
    interactive: "bg-card-bg border border-light shadow-default hover:shadow-xl hover:scale-[1.01] hover:border-primary-blue-dark/70 hover:bg-card-bg/95"
  };

  const paddingClasses = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 lg:p-6",
    lg: "p-6 sm:p-7 lg:p-8",
  };

  const borderClass = noBorder ? "border-0" : "";
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${borderClass} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = ({ className = "", children, ...props }: CardHeaderProps) => {
  return (
    <div className={`mb-3 sm:mb-4 lg:mb-5 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
}

const CardTitle = ({
  className = "",
  children,
  as: Component = "h3",
  size = "md",
  ...props
}: CardTitleProps) => {
  const sizeClasses = {
    sm: "text-sm sm:text-base font-semibold",
    md: "text-base sm:text-lg lg:text-xl font-semibold",
    lg: "text-lg sm:text-xl lg:text-2xl font-bold",
  };

  return (
    <Component
      className={`${sizeClasses[size]} text-text-primary-dark leading-tight ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spacing?: "tight" | "normal" | "relaxed";
}

const CardContent = ({ 
  className = "", 
  children, 
  spacing = "normal",
  ...props 
}: CardContentProps) => {
  const spacingClasses = {
    tight: "space-y-2",
    normal: "space-y-3 sm:space-y-4",
    relaxed: "space-y-4 sm:space-y-5 lg:space-y-6",
  };

  return (
    <div className={`text-text-secondary-dark ${spacingClasses[spacing]} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };
