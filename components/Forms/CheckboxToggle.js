const CheckboxToggle = ({ label, isChecked, onChange }) => {
  return (
    <label className="relative flex justify-between items-center group text-sm">
      {label}
      <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-700 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
    </label>
  );
};

export default CheckboxToggle;
