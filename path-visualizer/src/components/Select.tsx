import { ChangeEvent } from "react";

export const Select = ({
  onChange,
  options,
  label,
  isDisabled,
}: {
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}) => {

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-xs text-gray-300 ml-1" htmlFor={label}>
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="bg-gray-300 disabled:pointer-events-none rounded-md cursor-pointer hover:bg-gray-100 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full"
        id={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
  
}