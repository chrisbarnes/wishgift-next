import { ChangeEvent } from "react";

interface CheckboxToggleProps {
  label: string;
  isChecked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxToggle = ({ label, isChecked, onChange }: CheckboxToggleProps) => {
  return (
    <label className="relative flex justify-between items-center group text-xs p-2 uppercase font-bold">
      {label}
      <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-200 rounded-full duration-200 ease-in-out peer-checked:bg-white after:w-4 after:h-4 peer-checked:after:bg-gray-700 after:bg-blue-700 after:rounded-full after:shadow-md after:duration-200 peer-checked:after:translate-x-4"></span>
    </label>
  );
};

export default CheckboxToggle;
