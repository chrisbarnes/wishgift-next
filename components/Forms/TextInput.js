import Label from "./Label";

const TextInput = ({
  id,
  label,
  placeholder,
  required,
  register,
  value,
  onChange,
}) => {
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
