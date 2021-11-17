import CheckboxToggle from "../Forms/CheckboxToggle";

const MarkPurchasedButton = ({ isOwner, isPurchased }) => {
  // You can't mark your own gifts as purchased
  if (isOwner) {
    return null;
  }

  return <CheckboxToggle label="Purchased?" isChecked={isPurchased} />;
};

export default MarkPurchasedButton;
