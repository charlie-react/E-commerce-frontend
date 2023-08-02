import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const Filter = ({ category, onClick, isActive }) => {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <div
        className={`p-5 text-4xl  rounded-full ${isActive ?   "bg-yellow-500 text-white" : "bg-green-500"}`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center capitalize font-medium my-1">{category}</p>
    </div>
  );
};

export default Filter;
