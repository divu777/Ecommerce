import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import "./Header.css";

import { BsHandbag } from "react-icons/bs";

import SideBar from "./SideBar";
import { FaRegUser } from "react-icons/fa";
interface Category {
  _id: string;
  name: string;
  slug: string;
}

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories: Category[] = useCategory();
  const [cart] = useCart();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleUserDropdownOpen = () => {
    setIsUserDropdownOpen(true);
  };

  const handleUserDropdownClose = () => {
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      <div className="flex justify-between  shadow-lg w-full bg-white">
        <div className="relative z-10">
          <SideBar />
        </div>
        <div className="flex justify-center mt-5 relative">
          <NavLink
            to="/"
            className="flex text-4xl gap-4 font-bold tracking-wider uppercase relative lg:left-48 mt-3 sm:left-8 sm:mt-2 sm:text-3xl"
          >
            KickFusion
          </NavLink>
        </div>
        <ul className="flex items-center gap-5 text-xl  text-black  m-3  tracking-wider  ">
          <div className="flex items-center gap-5 m-auto">
            <li className=" bg-gray-200 rounded-3xl pl-2 pr-2 pb-1 pt-1 ">
              <SearchInput />
            </li>
            {auth.user ? (
              <li
                className="relative p-5 bg-gray-200 rounded-3xl"
                onMouseEnter={handleUserDropdownOpen}
                onMouseLeave={handleUserDropdownClose}
              >
                <div className="sm:text-lg ">
                  <FaRegUser />
                </div>
                {isUserDropdownOpen && (
                  <ul
                    className="absolute top-full left-0 bg-white text-black shadow-md rounded-md py-2 px-3 w-auto z-10"
                    onMouseEnter={handleUserDropdownOpen}
                    onMouseLeave={handleUserDropdownClose}
                  >
                    <li>
                      <NavLink
                        className="block py-1 px-2 hover:bg-gray-200 rounded"
                        to={`/dashboard/${
                          auth.user.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="block py-1 px-2 hover:bg-gray-200 rounded"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li className="p-5 bg-gray-200 rounded-3xl">
                  <NavLink to="/register">Sign Up</NavLink>
                </li>
                <li className="p-5 bg-gray-200 rounded-3xl">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            <li className="p-5 bg-gray-200 rounded-full w-16 h-16 ">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="relative text-2xl sm:text-xl">
                  <BsHandbag />
                </NavLink>
              </Badge>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Header;
