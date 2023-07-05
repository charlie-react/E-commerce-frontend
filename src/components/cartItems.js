import React from "react";
import { AiOutlinePlus, AiOutlineMinus,} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {AiFillDelete } from "react-icons/ai"
import { deleteItem, } from "../redux/productSlice";
import { increaseQuantity,decreaseQuantity } from "../redux/productSlice";
 

const CartItems = ({ image, category, price, total, qty, id, name }) => {
 
const dispatch = useDispatch()
 

 
  return (
    <div className="flex gap-4 items-center border border-slate-200 rounded ">
      <div className=" rounded   overflow-hidden ">
        <img
          src={`${process.env.PUBLIC_URL}/assets/${image}`}
          className="w-36 h-28"
        />
       
      </div>
      <div className=" p-2 flex flex-col h-full w-full  ">
        <div className="ml-auto flex items-center text-slate-600 cursor-pointer hover:text-red-500" onClick={()=>dispatch(deleteItem(id))}>
        <AiFillDelete/>
        </div>
        <h3 className="font-semibold text-slate-500   capitalize md:text-2xl">
          {name}
        </h3>
        <p className=" text-slate-400  capitalize font-medium">{category}</p>
        <p className="  font-bold">
          <span className="text-slate-500">₦</span>
          <span> {price}</span>
        </p>
        <div className="flex justify-between items-center   ">
          <div className="flex gap-2 items-center mb-3">
            <button
              className="bg-slate-500 py-1 px-1 text-white flex items-center hover:bg-slate-600 rounded my-2 w-full max-w-[20px]    "
              onClick={() =>dispatch(increaseQuantity(id))}
            >
              <AiOutlinePlus   />
            </button>
            <p className="font-semi-bold">{qty}</p>
            <button
              className="bg-slate-500 py-1 px-1 text-white rounded my-2 w-full hover:bg-slate-400 flex items-center  max-w-[20px]   "
           onClick={()=>dispatch(decreaseQuantity(id))}
            >
              <AiOutlineMinus />
            </button>
          </div>
          <div className=" flex items-center text-slate-600 font-semibold">
            <p> Total:</p>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
