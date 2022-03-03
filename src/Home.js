import React from "react";
import ReactPlayer from "react-player";
import Header from "./components/Header";
import section1 from "./assets/section1.jpg";
import section2 from "./assets/section2.jpg";
import { Link } from "react-router-dom";

export default function Home({ prod, cart }) {
  return (
    <div>
      <Header cart={cart} />
      <Link to="/products">
        <div className="flex justify-between gap-2 my-5">
          <div>
            <img src={section1} alt="" />
          </div>
          <div>
            <img src={section2} alt="" />
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:mb-4">
        {prod &&
          prod.map((item) => (
            <div key={item.sys.id} className="flex flex-col">
              <Link to={`products/details/${item.fields.slug}`}>
                <img src={item.fields.thumbnail.fields.file.url} alt="" />
              </Link>
              <div className="flex flex-col items-start gap-1 p-1 text-indigo-900">
                <p>{item.fields.name}</p>
                <p className=" font-semibold">{item.fields.price} $</p>
              </div>
            </div>
          ))}
      </div>
      <div className="hidden md:block w-full mx-auto max-w-7xl">
        <ReactPlayer
          loop={true}
          muted
          width={1280}
          height={720}
          playing={true}
          volume={null}
          url="https://www.youtube.com/watch?v=KRhrznno3fo&list=TLGGZ3ZcMYlPsxEwMjAzMjAyMg&t=12s"
        />
      </div>
    </div>
  );
}
