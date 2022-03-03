import React from "react";

import HeaderProducts from "./components/HeaderProducts";
import { Link } from "react-router-dom";

export default function Products({ products, cart }) {
  return (
    <div>
      <HeaderProducts cart={cart} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:mb-4">
        {products &&
          products.map((item) => (
            <div key={item.sys.id} className="flex flex-col">
              <Link to={`details/${item.fields.slug}`}>
                <img src={item.fields.thumbnail.fields.file.url} alt="" />
              </Link>
              <div className="flex items-center justify-between p-1 text-indigo-900">
                <p>{item.fields.name}</p>
                <p className="text-xl font-semibold">{item.fields.price} $</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
