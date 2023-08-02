import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { imageToBase64 } from "../utility/img-base64";
import { toast } from "react-hot-toast";
import axios from "axios";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

  const handleNewProductInput = (e) => {
    const { name, value } = e.target;
    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const uploadPicture = async (e) => {
    const image = await imageToBase64(e.target.files[0]);
    setData((prevState) => {
      return {
        ...prevState,
        image,
      };
    });
  };

  const submitNewProduct = async (e) => {
    e.preventDefault();
    const { name, image, category, price, description } = data;
    if ((name && image && category && price) || !description) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DOMAIN}/newproduct`,
          data,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        toast(response.data.msg);
        setData({
          name: "",
          image: "",
          description: "",
          price: "",
          category: "",
        });
      } catch (error) {
        toast(error.response.data.msg)
      }
    }
    // else if((description || !description)){ toast("input required fields")}
  };

  return (
    <div className="p-4 ">
      <form
        className="flex flex-col m-auto w-full max-w-md shadow p-3 bg-white"
        onSubmit={submitNewProduct}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="my-1 bg-slate-200"
          value={data.name}
          onChange={handleNewProductInput}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="my-1  bg-slate-200"
          value={data.category}
          onChange={handleNewProductInput}
        >
          <option>select Category</option>
          <option>Fruits</option>
          <option>Veggies</option>
          <option>Cakes</option>
          <option>Burgers</option>
          <option>Icecream</option>
          <option>Rice</option>
          <option>Pizza</option>
        </select>
        <label htmlFor="image">
          Image
          <div className="h-40 bg-slate-300 my-1   max-w-md flex items-center justify-center">
            {data.image ? (
              <img
                src={data.image}
                alt="pic"
                className="h-full   m-auto overflow-hiddden"
              />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            name="image"
            id="image"
            accept="image/*"
            onChange={uploadPicture}
          />
        </label>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          className="my-1 bg-slate-200 p"
          value={data.price}
          onChange={handleNewProductInput}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          name="description"
          className="resize-none bg-slate-200 my-1"
          value={data.description}
          onChange={handleNewProductInput}
        />
        <button className="bg-red-500 hover:bg-red-400 text-white rounded text-1xl font-medium">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
