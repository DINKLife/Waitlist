/**
 * Reusable input field component for waitlist forms
 */

import { Input } from "@heroui/input";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  classNames: {
    input: string;
    inputWrapper: string;
  };
  required?: boolean;
}

export function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  classNames,
  required = false,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: BRAND_COLORS.primary.light }}
      >
        {label}
      </label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        size="lg"
        classNames={classNames}
        style={{
          borderColor: BRAND_COLORS_RGBA.primaryLight[30],
        }}
      />
    </div>
  );
}

