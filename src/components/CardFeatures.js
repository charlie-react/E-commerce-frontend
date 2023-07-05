import React from "react";
import { Link } from "react-router-dom";
import { addItem } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const CartFeatures = ({ image, price, category, name, id }) => {
  // const cartProduct = useSelector((state)=>state.product.cartList)
  // console.log(cartProduct) //multiple printin as ai why
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(addItem({
      id,price,name,category,image
    }));
  };
  return (
    <div className="bg-white py-5 px-4 rounded hover:shadow-lg cursor-pointer  flex flex-col">
      <Link
        to={`/menu/${id}`}
        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
      >
        <div>
          <div className="w-40 min-h-[150px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/${image}`}
              className="  h-40 w-full"
            />
          </div>

          <h3 className="font-semibold text-slate-500   capitalize text-lg">
            {name}
          </h3>
          <p className=" text-slate-400  capitalize font-medium">{category}</p>
          <p className="  font-bold">
            <span className="text-slate-800">₦</span>
            <span> {price}</span>
          </p>
        </div>
        <button className="bg-yellow-400 py-1 px-1 text-white rounded my-2 hover:bg-slate-500 w-full  ">
          View Product
        </button>
      </Link>
      <button
        className="bg-green-400 py-1 px-1 text-white rounded my-2 hover:bg-green-500"
        onClick={() => addToCart()}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default CartFeatures;
