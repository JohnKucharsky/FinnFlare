import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import HeaderProducts from "./components/HeaderProducts";

export default function ProductDetails({ client, handleAdd, cart }) {
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const { items } = await client.getEntries({
        content_type: "product",
        "fields.slug": id,
      });
      setProduct(items);
    }
    getProduct();
  }, [client]);

  let images = [];

  if (product) {
    product.forEach((el) => (images = el.fields.images));
  }

  let idimages = [];

  images.forEach((el) => idimages.push(el.fields.file.url));

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };
  return (
    <div className="h-full ">
      <HeaderProducts cart={cart} />
      {/* view desktop */}
      <div className="hidden md:grid  gap-3 grid-cols-3">
        <div
          className=" col-span-2  h-full mb-8
        "
        >
          <div className="grid gap-1 grid-cols-2 ">
            {images.map((item) => (
              <div className=" " key={item.sys.id}>
                <img className="w-full" src={item.fields.file.url} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="pr-3">
          {product &&
            product.map((i) => (
              <div
                className="w-full flex flex-col gap-5 text-indigo-900"
                key={i.sys.id}
              >
                <h2 className="text-3xl">{i.fields.name}</h2>
                <p className="text-xl">{i.fields.price} $</p>
                {!cart.find((item) => item.sys.id === i.sys.id) ? (
                  <button
                    onClick={() => handleAdd(i)}
                    className="w-full py-2 text-xl border"
                  >
                    Buy
                  </button>
                ) : (
                  <Link to="/cart">
                    <button className="w-full py-2 text-xl border">
                      Go to cart
                    </button>
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="relative md:hidden">
        <IoIosArrowBack
          onClick={prevSlide}
          className="z-10 hover:scale-110 text-5xl  opacity-60  absolute top-1/2 left-5 "
        />
        <IoIosArrowForward
          onClick={nextSlide}
          className="z-10 hover:scale-110 text-5xl  opacity-60  absolute top-1/2 right-5 "
        />
        {product &&
          images.map((i) => (
            <div className="px-20" key={i.sys.id}>
              {idimages[current] === i.fields.file.url && (
                <img
                  src={i.fields.file.url}
                  alt=""
                  className="transition-all"
                />
              )}
            </div>
          ))}
      </div>
      <div className="mt-3 md:hidden">
        {product &&
          product.map((i) => (
            <div
              className="w-full flex flex-col items-center gap-5 text-indigo-900"
              key={i.sys.id}
            >
              <h2 className="text-3xl">{i.fields.name}</h2>
              <p className="text-xl">{i.fields.price} $</p>

              {!cart.find((item) => item.sys.id === i.sys.id) ? (
                <button
                  onClick={() => handleAdd(i)}
                  className="w-full py-2 text-xl border"
                >
                  Buy
                </button>
              ) : (
                <Link className="w-full" to="/cart">
                  <button className="w-full px-2 py-2 text-xl border">
                    Go to cart
                  </button>
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
