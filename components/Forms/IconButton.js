import Icons from "../Icons";

const IconButton = ({ accessibleText, icon, clickHandler }) => {
  return (
    <button className="w-5 h-5 rounded-md text-blue-700" onClick={clickHandler}>
      {icon === "Photo" && <Icons.Photo />}
      {icon === "Trash" && <Icons.Trash />}
      {icon === "Edit" && <Icons.Edit />}
      <span
        className="absolute overflow-hidden"
        style={{
          height: "1px",
          width: "1px",
          clip: "rect(1px, 1px, 1px, 1px)",
        }}
      >
        {accessibleText}
      </span>
    </button>
  );
};

export default IconButton;
