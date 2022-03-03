import React, { useEffect, useState } from "react";
import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.jpg";
import slider5 from "../assets/slider5.jpg";
import { FiShoppingBag } from "react-icons/fi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    img: slider1,
  },
  {
    id: 2,
    img: slider2,
  },
  {
    id: 3,
    img: slider3,
  },
  {
    id: 4,
    img: slider4,
  },
  {
    id: 5,
    img: slider5,
  },
];

export default function Header({ cart }) {
  const [current, setCurrent] = useState(1);
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length ? 1 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 1 ? length : current - 1);
  };
  useEffect(() => {
    setTimeout(nextSlide, 3000);
  }, []);

  return (
    <div>
      <div className="relative flex overflow-hidden">
        <div className="flex items-center justify-between w-full z-10 p-3 absolute text-white text-4xl md:px-9 lg:px-32">
          <h1>FINN FLARE</h1>
          <div className=" relative">
            {cart.length > 0 && (
              <Link to="/cart">
                <FiShoppingBag className="text-2xl font-bold" />
                <span className="absolute text-base badge h-5 w-5 grid font-bold place-content-center bg-white bg-opacity-75 text-black rounded-full">
                  {cart.length}
                </span>
              </Link>
            )}
          </div>
        </div>
        <FaArrowAltCircleLeft
          onClick={prevSlide}
          className="z-10 hover:scale-110 text-2xl opacity-60 md:text-3xl lg:text-4xl absolute top-1/2 left-3 md:left-7 lg:left-10"
        />
        <FaArrowAltCircleRight
          onClick={nextSlide}
          className="z-10 hover:scale-110 text-2xl opacity-60 md:text-3xl lg:text-4xl absolute top-1/2 right-3 md:right-7 lg:right-10"
        />
        {data.map((i) => (
          <div key={i.id}>
            {i.id === current && (
              <img src={i.img} alt="" className="transition-all" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
