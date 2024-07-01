import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed left-0 top-0 h-full flex flex-col justify-center">
      <ul className="flex flex-col">
        <li className="mb-4">
          <NavLink
            to="/dashboard/user/profile"
            className="text-white hover:text-gray-300"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/orders"
            className="text-white hover:text-gray-300"
          >
            Options
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserMenu;
