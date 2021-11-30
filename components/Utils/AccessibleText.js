const AccessibleText = ({ children }) => {
  return (
    <span
      className="absolute overflow-hidden"
      style={{
        height: "1px",
        width: "1px",
        clip: "rect(1px, 1px, 1px, 1px)",
      }}
    >
      {children}
    </span>
  );
};

export default AccessibleText;
