import clsx from "clsx";
import TextInput from "./TextInput";
import Error from "./Error";

const TextInputControl = ({
  id,
  label,
  placeholder,
  required,
  errors,
  register,
  value,
  onChange,
  horizontal,
}) => {
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
        horizontal={horizontal}
      />
      <Error errors={errors} name={id} />
    </div>
  );
};

export default TextInputControl;
