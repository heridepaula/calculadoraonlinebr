import { forwardRef, useEffect } from "react";
import { Input } from "./Input";
import { useSmartValidation, type ValidationConfig } from "~/hooks/useSmartValidation";

interface SmartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: string;
  shape: string;
  validationConfig?: ValidationConfig;
  fullWidth?: boolean;
  unit?: string;
}

export const SmartInput = forwardRef<HTMLInputElement, SmartInputProps>(
  ({ 
    label, 
    value, 
    onChange, 
    field, 
    shape, 
    validationConfig,
    fullWidth,
    unit,
    ...props 
  }, ref) => {
    const { validateInput, getValidation, updateValidation, clearValidation } = useSmartValidation();

    // Validar em tempo real
    useEffect(() => {
      if (value) {
        const result = validateInput(field, value, shape, validationConfig);
        updateValidation(field, result);
      } else {
        clearValidation(field);
      }
    }, [value, field, shape, validationConfig, validateInput, updateValidation, clearValidation]);

    const validation = getValidation(field);

    const getValidationStyles = () => {
      if (!validation) return "";
      
      switch (validation.type) {
        case 'error':
          return "border-system-error focus:ring-system-error";
        case 'warning':
          return "border-system-warning focus:ring-system-warning";
        case 'success':
          return "border-system-success focus:ring-system-success";
        case 'info':
          return "border-system-info focus:ring-system-info";
        default:
          return "";
      }
    };

    const getValidationIcon = () => {
      if (!validation) return null;
      
      switch (validation.type) {
        case 'error':
          return <span className="text-system-error">❌</span>;
        case 'warning':
          return <span className="text-system-warning">⚠️</span>;
        case 'success':
          return <span className="text-system-success">✅</span>;
        case 'info':
          return <span className="text-system-info">💡</span>;
        default:
          return null;
      }
    };

    const getValidationTextColor = () => {
      if (!validation) return "";
      
      switch (validation.type) {
        case 'error':
          return "text-system-error";
        case 'warning':
          return "text-system-warning";
        case 'success':
          return "text-system-success";
        case 'info':
          return "text-system-info";
        default:
          return "text-text-secondary";
      }
    };

    return (
      <div className={fullWidth ? "w-full" : ""}>
        <div className="relative">
          <Input
            ref={ref}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            className={`${getValidationStyles()}`}
            {...props}
          />
          
          {/* Ícone de validação */}
          {validation && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {getValidationIcon()}
            </div>
          )}

          {/* Unidade */}
          {unit && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm text-text-secondary">
              {unit}
            </div>
          )}
        </div>

        {/* Mensagem de validação */}
        {validation && (
          <div className={`mt-1 text-xs ${getValidationTextColor()} flex items-center gap-1`}>
            {getValidationIcon()}
            <span>{validation.message}</span>
          </div>
        )}

        {/* Dicas contextuais para campos específicos */}
        {field === 'radius' && !validation && (
          <div className="mt-1 text-xs text-text-secondary opacity-75">
            💡 Dica: Para diâmetro, use o campo específico abaixo
          </div>
        )}

        {field === 'diameter' && value && (
          <div className="mt-1 text-xs text-system-info">
            ✓ Raio calculado: {(parseFloat(value) / 2).toFixed(2)} {unit}
          </div>
        )}

        {field === 'height' && shape === 'cylinder' && value && (
          <div className="mt-1 text-xs text-text-secondary opacity-75">
            💡 Para cilindro ideal: altura ≈ diâmetro
          </div>
        )}
      </div>
    );
  }
);

SmartInput.displayName = "SmartInput";