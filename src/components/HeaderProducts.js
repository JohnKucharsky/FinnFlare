import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function HeaderProducts({ cart }) {
  return (
    <div className="flex items-center justify-between p-4 lg:p-6 lg:px-20">
      <Link to="/">
        <img className=" w-48" src={logo} alt="" />
      </Link>

      <div className=" relative">
        {cart.length > 0 && (
          <Link to="/cart">
            <FiShoppingBag className="text-2xl text-indigo-900 font-bold" />
            <span className="absolute text-xs badge h-4 w-4 grid font-bold place-content-center bg-white bg-opacity-80 text-indigo-900 rounded-full border border-indigo-300">
              {cart && cart.length}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
