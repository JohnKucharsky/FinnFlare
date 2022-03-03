import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

export default function Cart({ cart, handleAdd, onDelete, setCart }) {
  let itemsPrice = cart.reduce((a, c) => a + c.fields.price * c.qty, 0);
  let totalItems = cart.reduce((a, c) => a + c.qty, 0);

  function removeFromCart(item) {
    setCart(cart.filter((x) => x.sys.id !== item.sys.id));
  }
  return (
    <div className="text-indigo-900">
      <nav className="flex justify-center items-center ">
        <Link to="/">
          <img className="h-10" src={logo} alt="" />
        </Link>
      </nav>
      {cart.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-10 max-w-7xl mx-auto p-5 my-10">
          <div>
            <h1 className="text-3xl mb-8">Order details:</h1>
            <h3 className="text-center text-lg">Total price {itemsPrice}$</h3>
            <Link to="/products">
              <button
                onClick={() => setCart([])}
                className="text-center w-full border mt-4 py-2 bg-indigo-900 text-white text-xl"
              >
                Proceed to checkout
              </button>
            </Link>
          </div>
          <div>
            <h3 className="text-3xl mb-3">Shopping Cart({totalItems})</h3>

            {cart.map((i) => (
              <div key={i.sys.id} className=" flex gap-2 p-1">
                <div>
                  <img
                    className=" w-20"
                    src={i.fields.thumbnail.fields.file.url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-lg underline underline-offset-4">
                    {i.fields.name}
                  </div>
                  <div className="flex justify-between pr-5">
                    <p className="text-lg font-bold">{i.fields.price}$</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => onDelete(i)} className="text-xl">
                        -
                      </button>
                      <p>{i.qty} pc.</p>
                      <button onClick={() => handleAdd(i)} className="text-xl">
                        +
                      </button>
                    </div>
                  </div>
                  <p>Fast Delivery</p>
                </div>
                <div className="grid place-content-center">
                  <IoMdClose
                    onClick={() => removeFromCart(i)}
                    className="text-2xl opacity-70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Link to="/">
          <h1 className="text-center my-8 text-2xl underline-offset-4 underline">
            Go and buy something!
          </h1>
        </Link>
      )}
    </div>
  );
}
