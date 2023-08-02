import React from "react";
import { useSelector } from "react-redux";
import CartItems from "../components/cartItems";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../28383-cart-animation.gif";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const cartProducts = useSelector((state) => state.product.cartList);
  const cartNumber = useSelector((state) => state.product.cartList).length;
  const totalQuantity = cartProducts.reduce(
    (acc, element) => acc + element.qty,
    0
  );
  const totalAmount = cartProducts.reduce(
    (acc, element) => acc + element.total,
    0
  );

  const userData = useSelector((state) => state.user);

  const navigate = useNavigate();

  const forPayment = async () => {
   
    if (userData.firstname) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_DOMAIN}/checkout-payment`,
          cartProducts,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        toast("Redirecting to payment portal...");
        stripePromise.redirectToCheckout({ sessionId: data });
      } catch (error) {
       
      }
    } else {
      toast("Login Required");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <>
      {cartNumber < 1 ? (
        <div className="py-5 flex flex-col gap-2">
          <h2 className="font-bold text-4xl text-center m-auto ">
            Cart Is Empty
          </h2>
          <div className="m-auto bg-transparent">
            <img src={emptyCart} className="w-full" />
          </div>
          <Link to={"/"} className="m-auto">
            <button className="text-white bg-slate-500 hover:bg-slate-600 font-medium rounded  p-2">
              Go Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="p-2 md:p-4 ">
          <h3 className="text-lg md:text-2xl font-bold text-slate-600">
            Cart Items
          </h3>

          <div className="my-3 md:flex gap-3">
            {/* items display */}
            <div className="flex flex-col gap-1 md:w-1/2 max-w-3xl bg-slate-300 p-2 mb-3 ">
              {cartProducts.map((product) => {
                const { id, qty, total, price, image, name, category } =
                  product;
                return (
                  <CartItems
                    image={image}
                    key={id}
                    id={id}
                    price={price}
                    total={total}
                    qty={qty}
                    name={name}
                    category={category}
                  />
                );
              })}
            </div>
            {/* total */}
            <div className="w-full ml-auto  max-w-md">
              <div className="bg-blue-500 py-3">
                <h2 className="text-white text-lg text-center">Summary</h2>
              </div>
              <div className="flex ">
                <p>Total Qty:</p>
                <p className="ml-auto font-medium w-16 md:w-36">
                  {totalQuantity}
                </p>
              </div>
              <div className="flex">
                <p>Total Price:</p>
                <p className="ml-auto font-medium w-16 md:w-36">
                  {totalAmount}
                </p>
              </div>
              <button
                className="w-full bg-green-500 text-white items-center py-2"
                onClick={forPayment}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
