import CheckboxToggle from "../Forms/CheckboxToggle";

const MarkPurchasedButton = ({ isOwner, isPurchased, onChange }) => {
  // You can't mark your own gifts as purchased
  if (isOwner) {
    return null;
  }

  return (
    <CheckboxToggle
      label="Purchased?"
      onChange={onChange}
      isChecked={isPurchased}
    />
  );
};

export default MarkPurchasedButton;
