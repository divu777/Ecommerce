import React, { ChangeEvent, FormEvent } from "react";

interface CategoryFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
}

const CategoryFrom: React.FC<CategoryFormProps> = ({
  handleSubmit,
  value,
  setValue,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="enter new category"
          value={value}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryFrom;
