import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="flex flex-col text-white bg-black text-3xl font-bold overflow-hidden">
        <div className="top flex flex-col md:flex-row p-10 overflow-hidden justify-between mx-7">
          <h1 className="relative left-0 md:left-20 text-3xl md:text-5xl mb-4 md:mb-0">
            KickFusion
          </h1>
          <p className="text-base md:text-xl w-full md:w-2/5">
            KickFusion is your go-to destination for the latest and greatest
            sneakers. Whether you're a die-hard sneakerhead or just looking to
            add some fresh kicks to your collection, we've got you covered.
            Explore our extensive range of sneakers from top brands and grab
            your perfect pair. PS: We won't deliver and take all your money –
            just kidding, we're legit!
          </p>
        </div>
        <div className="middle flex flex-row md:flex-row justify-center md:justify-evenly p-8 gap-20 md:gap-36 mb-8 sm:text-xl">
          <NavLink to="/">Featured</NavLink>
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <hr />
        <div className="bottom flex flex-row-reverse md:flex-row justify-between mx-7 p-8 text-base md:text-xl mb-3">
          <h3 className="pl-0 md:pl-20">2023 All rights reserved</h3>
          <div className="flex flex-row gap-2 md:flex-row md:gap-10 pr-0 md:pr-20">
            <h2>Terms & Condition</h2>
            <NavLink to="/policy">Shipping Policy</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
