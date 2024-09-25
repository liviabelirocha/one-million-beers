import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errors?: string[];
  label?: string;
  labelClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errors, label, name, labelClassName, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        <input name={name} {...props} ref={ref} />

        {errors && (
          <ul className="text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
