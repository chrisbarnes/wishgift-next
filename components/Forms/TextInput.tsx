import {
  UseFormRegister,
  FieldValues,
  Path,
  ChangeHandler,
} from "react-hook-form";
import Label from "./Label";

interface TextInputProps<T extends FieldValues = FieldValues> {
  id: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  value?: string;
  onChange?: ChangeHandler;
}

const TextInput = <T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  required,
  register,
  value,
  onChange,
}: TextInputProps<T>) => {
  return (
    <>
      {label && <Label id={id} label={label} />}
      <input
        {...register(id, { required, onChange })}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-xs"
      />
    </>
  );
};

export default TextInput;
