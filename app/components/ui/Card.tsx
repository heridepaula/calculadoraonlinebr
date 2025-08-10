import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const Card = ({ className = "", children, padding = "md", ...props }: CardProps) => {
  const baseClasses =
    "bg-card-bg rounded-lg border border-light shadow-default transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary-blue-dark/70 hover:bg-card-bg/95";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const classes = `${baseClasses} ${paddingClasses[padding]} ${className}`.trim();

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
    <div className={`mb-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = ({
  className = "",
  children,
  as: Component = "h3",
  ...props
}: CardTitleProps) => {
  return (
    <Component
      className={`text-lg font-semibold text-text-primary-dark ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent = ({ className = "", children, ...props }: CardContentProps) => {
  return (
    <div
      className={`text-text-secondary-dark ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };
