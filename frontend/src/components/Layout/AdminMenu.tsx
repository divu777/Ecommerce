import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed left-0 top-0 h-full flex flex-col justify-center">
      <ul className="flex flex-col">
        <li className="mb-4">
          <NavLink
            to="/dashboard/admin/create-category"
            className="text-white hover:text-gray-300"
          >
            Create Category
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/dashboard/admin/create-product"
            className="text-white hover:text-gray-300"
          >
            Create Product
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/dashboard/admin/products"
            className="text-white hover:text-gray-300"
          >
            Products
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/dashboard/admin/users"
            className="text-white hover:text-gray-300"
          >
            Users
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/dashboard/admin/orders"
            className="text-white hover:text-gray-300"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;
