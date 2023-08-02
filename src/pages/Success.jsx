import React from "react";
import { FcPaid } from "react-icons/fc";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <div className="flex mx-auto p-5 m-8 items-center bg-slate-600 rounded-sm flex-col max-w-md gap-3 h-40">
        <h1 className="text-center font-bold text-green-500 flex items-center">
          <span>Success!</span> <FcPaid className="bg-slate-300 mx-1" />
        </h1>
        <p className="text-white">Thank You For Your Patronage!</p>
      <Link to={'/'}>
      <button className="bg-green-500 text-white p-2 rounded-md w-20  hover:bg-green-600">Home</button>
      </Link>
      </div>
    </div>
  );
};

export default Success;
