import React, { useState } from "react";
import { IoBasketballSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const categories: Category[] = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <ul className="flex justify-between items-center gap-20 text-xl p-8 bg-black text-white rounded-3xl m-3 font-bold tracking-wider uppercase">
        <NavLink to="/">
          <IoBasketballSharp className="text-4xl" />
        </NavLink>
        <div className="flex items-center gap-10">
          <li>
            <SearchInput />
          </li>
          <li
            className="relative"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <NavLink to="/category">Category</NavLink>
            {/* Conditional rendering for dropdown */}
            {isDropdownOpen && (
              <ul
                className="absolute top-full left-0 bg-white text-black shadow-md rounded-md py-2 px-3 w-40 z-10"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="block py-1 px-2 hover:bg-gray-200 rounded"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/register">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  DashBoard
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout} to="/login">
                  Log Out
                </NavLink>
              </li>
            </>
          )}
          <li>
            <Badge count={cart?.length} showZero>
              <NavLink to="/cart">Cart</NavLink>
            </Badge>
          </li>
        </div>
      </ul>
    </>
  );
};

export default Header;
