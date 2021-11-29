import { useForm, useWatch } from "react-hook-form";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

const GiftFilters = ({ searchCallback, resetFilters }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm();

  const onSubmit = (data) => {
    // Call the callback and pass the data
    searchCallback(data);
  };

  const onReset = () => {
    reset();
    resetFilters();
  };

  console.log("dirty fields", dirtyFields);

  return (
    <div className="mb-12 py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputControl
          id="search"
          label="Search gifts"
          register={register}
          errors={errors}
          required
          onChange={(e) => searchCallback({ search: e.target.value })}
        />
        <Button>Search</Button>
        {dirtyFields && dirtyFields.search && (
          <Button type="button" onClick={onReset}>
            Reset
          </Button>
        )}
      </form>
    </div>
  );
};

export default GiftFilters;
