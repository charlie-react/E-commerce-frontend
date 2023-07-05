import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ image, name, category, price,id }) => {
    console.log(image)
  return (
    <Link to={`/menu/${id}`} >
    <div className="bg-white p-2 rounded shadow-md">
      <div className="w-40 min-h-[150px]">
        <img src={`${process.env.PUBLIC_URL}/assets/${image}`} className="w-full h-full" />
      </div>

      <h3 className="font-semibold text-slate-500 text-center capitalize text-lg">{name}</h3>
      <p className=" text-slate-400 text-center capitalize font-medium">{category}</p>
      <p className="text-center font-bold">
        <span className="text-slate-700">₦</span>
       <span> {price}</span>
      </p>
    </div>
    </Link>
  );
};

export default HomeCard;
