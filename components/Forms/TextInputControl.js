import TextInput from "./TextInput";
import Error from "./Error";

const TextInputControl = ({ id, label, required, errors, register }) => {
  return (
    <div className="mb-2">
      <TextInput
        id={id}
        label={label}
        register={register}
        required={required}
      />
      <Error errors={errors} name={id} />
    </div>
  );
};

export default TextInputControl;
