import React from "react";
import ig from "../assets/ig.svg";
import fb from "../assets/fb.svg";
import ok from "../assets/ok.svg";
import yt from "../assets/yt.svg";
import tt from "../assets/tt.svg";
import vk from "../assets/vk.svg";

export default function Footer() {
  return (
    <div className="max-w-xs mx-auto">
      <ul className="flex items-center my-5 justify-evenly">
        <li>
          <img className="h-10" src={ig} alt="" />
        </li>
        <li>
          <img className="h-10" src={fb} alt="" />
        </li>
        <li>
          <img className="h-10" src={ok} alt="" />
        </li>
        <li>
          <img className="h-10" src={yt} alt="" />
        </li>
        <li>
          <img className="h-10" src={tt} alt="" />
        </li>
        <li>
          <img className="h-10" src={vk} alt="" />
        </li>
      </ul>
    </div>
  );
}
