import TextInput from "./TextInput";
import Error from "./Error";

const TextInputControl = ({
  id,
  label,
  required,
  errors,
  register,
  value,
  onChange,
}) => {
  return (
    <div className="mb-2">
      <TextInput
        id={id}
        label={label}
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
