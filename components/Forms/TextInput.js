import Label from "./Label";

const TextInput = ({ id, label, required, register, value, onChange }) => {
  return (
    <>
      <Label id={id} label={label} />
      <input
        {...register(id, { required, onChange })}
        defaultValue={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </>
  );
};

export default TextInput;
