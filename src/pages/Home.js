import React, { useRef, useState, useEffect } from "react";
import HomeCard from "../components/HomeCard";
 
import products from "../ProductsArray";
import CartFeatures from "../components/CardFeatures";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
 
import TotalProducts from "../components/TotalProducts";

const Home = () => {
  // const productData =useSelector((state)=>state.product.productList)
  const prouctCartDisplay = products.slice(0, 4);
  const veggiesProductsDisplay = products.filter(
    (product) => product.category === "veggies"
  );
 
  const sliderRef = useRef();
  const handleScrollPrev = (e) => {
    sliderRef.current.scrollLeft -= 200;
  };
  const handleScrollNext = () => {
    sliderRef.current.scrollLeft += 200;
  };

  return (
    <div className="p-2 md:p-4  ">
      <div className="md:flex gap-3 ">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-300 w-36 rounded-full items-center px-2">
            <p className="text-sm font-medium">Bike Delivery</p>
            <img
              src="https://media.istockphoto.com/id/652875076/photo/motorcycle-delivery-box.jpg?s=612x612&w=0&k=20&c=eDM37--xDwLITDya-VbsiY8uym_zWp0HSVHIjq54n8I="
              className="h-6"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-4">
              Delivery in a{" "}
            <span className="text-red-500 bg-white-500 ">
              Flash
            </span>
          </h2>
          <p className="text-base -mt-2">
          Experience the thrill of swift fulfillment and be ready to unwrap your much-anticipated packages sooner than you ever imagined. We take pride in exceeding your expectations with our unparalleled commitment to fast, reliable, and hassle-free deliveries. Fast delivery. Unmatched convenience. Welcome to a world where your purchases arrive at your doorstep in the blink of an eye.
          </p>
          <button className=" font-bold md:w-full  max-w-[120px] flex   bg-red-500 hover:bg-red-600 md:text-xl py-1 px-1 whitespace-nowrap md:px-2 rounded mt-4 text-white ">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center ">
          {prouctCartDisplay.length > 0 &&
            prouctCartDisplay.map(({ image, price, category, id, name }) => {
              return (
                <HomeCard
                  image={image}
                  price={price}
                  category={category}
                  name={name}
                  key={id}
                  id={id}
                />
              );
            })}
        </div>
      </div>
      <div className=" ">
        <div className="flex w-full items-center ">
          <h2 className="font-bold text-4xl   mb-3">Fresh Veggies</h2>
          <div className="ml-auto flex gap-3">
            <button
              className="text-2xl rounded bg-slate-400 hover:bg-slate-500 p-1"
              onClick={handleScrollPrev}
            >
              <GrFormPrevious />
            </button>
            <button
              className="text-2xl  bg-slate-400 hover:bg-slate-500 p-1"
              onClick={handleScrollNext}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
        <div
          className=" flex gap-5  overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={sliderRef}
        >
          {veggiesProductsDisplay.length > 0 &&
            veggiesProductsDisplay.map((element) => {
              const { image, price, category, id, name } = element;
              return (
                <CartFeatures
                  image={image}
                  price={price}
                  category={category}
                  name={name}
                  key={id}
                  id={id}
                />
              );
            })}
        </div>
        <TotalProducts title={"All Products"} />
      </div>
    
    </div>
  );
};

export default Home;
