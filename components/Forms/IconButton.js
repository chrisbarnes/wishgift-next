import Icons from "../Icons";

const IconButton = ({ accessibleText, icon, clickHandler }) => {
  return (
    <button className="w-5 h-5 rounded-md" onClick={clickHandler}>
      {icon === "Trash" && <Icons.Trash />}
      {icon === "Edit" && <Icons.Edit />}
      <span className="">{accessibleText}</span>
    </button>
  );
};

export default IconButton;
