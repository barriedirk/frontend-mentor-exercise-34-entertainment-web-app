import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

import "./FormInput.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  error,
  autoComplete,
}: Props<T>) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <fieldset
      className="form-group"
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={inputId}
            type={type}
            {...field}
            autoComplete={autoComplete}
            placeholder=" "
            className={`form-control text-preset-4-mobile md:text-preset-4 ${error ? "is-invalid" : ""}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
        )}
      />

      <label
        id={`${name}-label`}
        className="text-preset-4-mobile md:text-preset-4"
        htmlFor={inputId}
      >
        {label}
      </label>

      {error && (
        <span id={errorId} role="alert" className="text-preset-4-mobile error">
          {error.message}
        </span>
      )}
    </fieldset>
  );
};

export default InputForm;
