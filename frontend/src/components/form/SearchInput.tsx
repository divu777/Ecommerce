import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValue] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:3030/api/v1/product/search/${values.keyword}`
      );
      setValue({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={values.keyword}
          onChange={(e) => setValue({ ...values, keyword: e.target.value })}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchInput;
