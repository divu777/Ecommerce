import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  const [values, setValue] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/search/${
          values.keyword
        }`
      );
      setValue({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="search"
          value={values.keyword}
          onChange={(e) => setValue({ ...values, keyword: e.target.value })}
          className=" rounded-2xl py-2 px-4  bg-gray-200 border-none md:w-48 sm:w-24 sm:py-2 sm:px-4 sm:text-lg"
          placeholder="Search..."
        />
        <button type="submit" className="">
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
