import clsx from "clsx";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import TextInput from "./TextInput";
import Error from "./Error";

interface TextInputControlProps<T extends FieldValues = FieldValues> {
  id: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<T>;
  value?: string;
  onChange?: () => void;
  horizontal?: boolean;
}

const TextInputControl = <T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  required,
  errors,
  register,
  value,
  onChange,
  horizontal,
}: TextInputControlProps<T>) => {
  const wrapperClasses = clsx({
    "mb-2": !horizontal,
    flex: horizontal,
    "items-center": horizontal,
    "flex-grow": horizontal,
  });
  return (
    <div className={wrapperClasses}>
      <TextInput
        id={id}
        label={label}
        placeholder={placeholder}
        register={register}
        required={required}
        value={value}
        onChange={onChange}
      />
      <Error errors={errors} name={id} />
    </div>
  );
};

export default TextInputControl;
