import React, { useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import products from "../ProductsArray";
import CartFeatures from "./CardFeatures";
import Filter from "./Filter";

const TotalProducts = ({title}) => {

    const differentCategories = [...new Set(products.map((el) => el.category))];

const [filterWord,setFilterWord] = useState("")
  const [filterData, setFiltetrData] = useState([]);

   // initial render
  useEffect(() => {
    setFiltetrData(products);
  }, [products]);

    // return all products
  const allProducts = () => {
    return setFiltetrData(products);
  };

  // filter products by category
  const handleProductsFilter = (category) => {
   setFilterWord(category)
    const filtered = products.filter(
      (element) => element.category.toLowerCase() === category.toLowerCase()
    );
    return setFiltetrData([...filtered]);
  };


  return (
    <>
      <div>
        <h2 className="font-bold text-3xl   my-4">{title}</h2>
      </div>
      <div className="flex overflow-scroll scrollbar-none gap-3  md:justify-center items-center ">
        <div className="flex flex-col cursor-pointer" onClick={allProducts}>
          <div className="p-5 text-4xl text-white  bg-red-400 rounded-full">
            <CiForkAndKnife />
          </div>
          <p className="text-center capitalize font-medium my-1">All</p>
        </div>
        {differentCategories[0] &&
          differentCategories.map((category) => {
            return (
              <Filter
                category={category}
                isActive={category.toLowerCase()  ===filterWord.toLowerCase() }
                onClick={() => handleProductsFilter(category)}
              />
            );
          })}
      </div>

      <div className="flex   flex-wrap justify-center gap-3 items-center my-3">
        {filterData.map((element) => {
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
    </>
  );
};

export default TotalProducts;
