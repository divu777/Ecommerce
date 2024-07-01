// Navigation.tsx

import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const categories: Category[] = useCategory();

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul variants={variants}>
    {categories.map((category) => (
      <MenuItem key={category._id}>
        <NavLink
          to={`/category/${category.slug}`}
          className="hover:text-gray-800"
        >
          {category.name}
        </NavLink>
      </MenuItem>
    ))}
    <MenuItem>
      <NavLink to="/new" className="hover:text-gray-800">
        New
      </NavLink>
    </MenuItem>
    <MenuItem>
      <NavLink to="/popular" className="hover:text-gray-800">
        Popular
      </NavLink>
    </MenuItem>
  </motion.ul>
);
