import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "Selecione uma opção",
  fullWidth = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label className="mb-2 block text-base font-medium text-text-primary-dark md:text-sm">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={` ${fullWidth ? "w-full" : "min-w-[120px]"} flex min-h-[44px] items-center justify-between rounded-md border border-neutral-surface-variant bg-background-dark-secondary px-3 py-2 text-left text-sm text-text-primary-dark transition-all duration-200 hover:border-primary-blue-dark focus:border-primary-blue-dark focus:outline-none focus:ring-2 focus:ring-primary-blue-dark/20 md:py-3 md:text-base`}
        >
          <span className={selectedOption ? "text-text-primary-dark" : "text-text-secondary-dark"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`h-4 w-4 text-text-secondary-dark transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-md border border-neutral-surface-variant bg-background-dark-secondary shadow-lg">
              <div className="py-1">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex min-h-[44px] w-full items-center px-3 py-2 text-left text-sm duration-150 hover:bg-primary-blue/10 md:py-3 md:text-base ${
                      value === option.value
                        ? "bg-primary-blue/10 text-primary-blue-dark"
                        : "text-text-primary-dark"
                    } `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
