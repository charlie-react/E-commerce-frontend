import React from "react";
import { useParams } from "react-router-dom";
import products from "../ProductsArray";
import TotalProducts from "../components/TotalProducts";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/productSlice";

const Menu = () => {
  const { filter } = useParams();
  // console.log(filter);
  const findProduct = products.filter(
    (element) => element.id === Number(filter) 
  )[0];
 
  const { image, category, description, id, price, name } = findProduct;
  const dispatch = useDispatch()
  const addToCart = (e) => {
    dispatch(addItem({
      id,price,name,category,image
    }));
  };
  const buyButton =()=>{
    dispatch(addItem({
      id,price,name,category,image
    }));
  }
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex m-auto bg-wheat-100 w-full max-w-2xl">
        <div className="md:w-1/2 max-h-[250px]  md:mr-3">
          <img
            src={`${process.env.PUBLIC_URL}/assets/${image}`}
            className="w-full hover:scale-105 overflow-hidden transition-all p-1 h-full "
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-1  ">
          <h3 className="font-semibold text-slate-500   capitalize md:text-4xl">
            {name}
          </h3>
          <p className=" text-slate-400  capitalize font-medium md:text-3xl">{category}</p>
          <p className="  font-bold md:text-xl">
            <span className="text-slate-600">$</span>
            <span> {price}</span>
          </p> 
          <div className="flex justify-center gap-2">
          <button className="bg-green-400 py-1 px-1 text-white rounded my-2 w-full min-w-[100px]  hover:bg-green-500" onClick={buyButton}>Buy</button>
          <button className="bg-green-400 py-1 px-1 text-white rounded my-2 w-full min-w-[100px]  hover:bg-green-500 md:mr-1" onClick={addToCart}>Add To Cart</button>
          </div>
          <div >
            <p className="text-slate-600  font-medium">Description:</p>
            <p >{description}</p>
          </div>
        </div>
      </div>
      <TotalProducts title={"Related Products"} />
    </div>
  );
};

export default Menu;
