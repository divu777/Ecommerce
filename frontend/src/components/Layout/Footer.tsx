import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-center gap-5 items-center mt-auto h-48 text-gray-600 bg-black text-3xl font-bold">
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/policy">Policy</NavLink>
    </div>
  );
};

export default Footer;
