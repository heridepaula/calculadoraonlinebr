import React from "react";
import { Card } from "~/components/ui";

interface ResultCardProps {
  label: string;
  value: number | string;
  unit?: string;
  color?: "success" | "warning" | "info" | "primary";
  size?: "small" | "medium" | "large";
  icon?: string;
  description?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  label,
  value,
  unit = "",
  color = "primary",
  size = "medium",
  icon,
  description
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "border-system-success/20 bg-system-success/10 text-system-success";
      case "warning":
        return "border-system-warning/20 bg-system-warning/10 text-system-warning";
      case "info":
        return "border-system-info/20 bg-system-info/10 text-system-info";
      default:
        return "border-primary-blue/20 bg-primary-blue/10 text-primary-blue-dark";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "p-2";
      case "large":
        return "p-6";
      default:
        return "p-3";
    }
  };

  const getValueTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "large":
        return "text-3xl";
      default:
        return "text-xl";
    }
  };

  return (
    <Card className={`${getColorClasses()} ${getSizeClasses()} text-center transition-all hover:scale-105`}>
      <div className="space-y-1">
        {icon && (
          <div className="text-lg" role="img" aria-hidden="true">
            {icon}
          </div>
        )}
        <p className="text-xs text-text-secondary font-medium">{label}</p>
        <div className={`${getValueTextSize()} font-bold tabular-nums`}>
          {typeof value === 'number' ? value.toFixed(3) : value} {unit}
        </div>
        {description && (
          <p className="text-xs text-text-secondary opacity-75">{description}</p>
        )}
      </div>
    </Card>
  );
};