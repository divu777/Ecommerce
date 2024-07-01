import { useState } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import "./Header.css";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const SideBar = () => {
  const categories: Category[] = useCategory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="sidebar-container">
      {/* White Circle Background */}
      <div
        className={`fixed top-4 left-4 z-40 w-16 h-16 bg-white rounded-full sm:w-14 sm:h-14 sm:top-5 sm:left-3 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-5 z-50 p-3 rounded-md focus:outline-none transition-opacity duration-300 hover:scale-105 sm:top-5 sm:left-3 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg
          className="w-10 h-10 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-40 w-96 bg-white transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="relative top-16 p-1 left-8 text-3xl font-semibold text-gray-800 inline-block uppercase">
          Welcome, user
        </h1>
        <div className="p-4 relative">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-1 right-4 z-50 p-1 rounded-md focus:outline-none transition-transform duration-300 transform hover:scale-110 "
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Sidebar Content */}
          <div
            className={`opacity-0 transition-opacity duration-800 relative top-16 ${
              isSidebarOpen ? "opacity-100" : ""
            }`}
            onClick={closeSidebar}
          >
            <div className="p-5 text-2xl  mb-2 text-center font-semibold uppercase ">
              Categories
            </div>
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="p-4 bg-gray-200  mb-2 text-center"
                >
                  <NavLink
                    to={`/category/${category.slug}`}
                    className="hover:text-gray-800"
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li className="p-5 bg-gray-200  mb-2 text-center">New</li>
              <li className="p-5 bg-gray-200  mb-2 text-center">Popular</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
