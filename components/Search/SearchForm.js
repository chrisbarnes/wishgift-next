import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";
import Icons from "../Icons";
import AccessibleText from "../Utils/AccessibleText";

const SearchForm = ({
  searchCallback,
  searchCallbackNoUrlUpdate,
  resetFilters,
  initialValue,
}) => {
  const isWidePage = useMediaQuery("(min-width: 768px)");
  const [isExpanded, setIsExpanded] = useState(!!initialValue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      search: initialValue || "",
    },
  });

  const onSubmit = (data) => {
    // Call the callback with URL update (on Enter key press)
    searchCallback(data);
  };

  const onReset = () => {
    reset({ search: "" });
    resetFilters();
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const wrapperClasses = clsx({
    "py-4": true,
    flex: true,
    "md:translate-x-80": !isExpanded,
    "transition-transform": true,
  });

  return (
    <div className="md:overflow-hidden">
      <div className={wrapperClasses}>
        <button className="mr-2 text-gray-700" onClick={toggleSearch}>
          <Icons.Search size="lg" />
          <AccessibleText>Toggle Search</AccessibleText>
        </button>
        <form
          className="flex items-center w-54 md:w-80"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex-grow pr-2 md:pr-0">
            <TextInputControl
              id="search"
              placeholder="Search gifts"
              register={register}
              errors={errors}
              required
              onChange={
                isWidePage
                  ? (e) => searchCallbackNoUrlUpdate({ search: e.target.value })
                  : null
              }
              horizontal
            />
            {dirtyFields && dirtyFields.search && (
              <button
                className="absolute right-4 top-2"
                type="button"
                onClick={onReset}
              >
                <Icons.Close size="sm" />
                <AccessibleText>Clear Search</AccessibleText>
              </button>
            )}
          </div>
          <Button className="md:hidden">Search</Button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
