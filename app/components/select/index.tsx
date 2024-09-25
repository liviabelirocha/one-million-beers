import { SelectHTMLAttributes } from "react";

export const Select = ({
  label,
  id,
  children,
  errors,
  labelClassName,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  errors?: string[];
  labelClassName?: string;
}) => (
  <div>
    {label && (
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    )}
    <select
      id={id}
      {...rest}
      className="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400 text-gray-600"
    >
      {children}
    </select>
    {errors && (
      <ul className="text-red-500">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )}
  </div>
);
