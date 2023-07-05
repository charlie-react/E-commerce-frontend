import React, { useState } from "react";
// import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const dispatch = useDispatch();

  const modalFn = () => {
    setShowModal(!showModal);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logged Out Successfully");
  };
  const cartNumber = (useSelector((state)=>state.product.cartList)).length
  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    // desktop
    <header className="fixed w-full h-16 shadow-md px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <div className="h-10 mb-3">
          <Link>
            {/* <img src={logo} alt="logo" className="h-full" /> */}
            <div className="h-full text-5xl text-red-600 ">RunAmNow</div>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-7" >
          <nav className="  gap-4 md:gap-7 text-base md:text-lg md:flex hidden">
            <Link to={""}>Home</Link>
            <Link to={"menu/2"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}> <BsCartFill /> 
            <div className="absolute -top-2 -right-1 bg-red-500 text-white text-center w-4 h-4 p-0 m-0 rounded-full text-xs">
            {cartNumber}
            </div>
            </Link>
          </div>
          <div className="text-3xl text-slate-600 cursor-pointer h-8   " onClick={modalFn}>
            {userData.profilepic ? (
              <img
                src={userData.profilepic}
                className="h-full w-full rounded-full overflow-hidden shadow drop-shadow-md"
              />
            ) : (
              <HiOutlineUserCircle />
            )}
          </div>
          {showModal && (
            <div className="absolute right-2 top-12 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
              {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <Link
                  to={"newproduct"}
                  className="whitespace-nowrap cursor-pointer"
                >
                  New Product
                </Link>
              )}

              {userData.profilepic ? (
                <Link
                  to={"/"}
                  className="whitespace-nowrap cursor-pointer bg-red-400 text-white rounded p-1"
                  onClick={handleLogout}
                >
                  Logout ({userData.firstname})
                </Link>
              ) : (
                <Link to={"login"} className="whitespace-nowrap cursor-pointer">
                  Login
                </Link>
              )}
              <nav className="     text-base md:text-lg  flex flex-col md:hidden">
                <Link to={""}>Home</Link>
                <Link to={"menu/2"}>Menu</Link>
                <Link to={"about"}>About</Link>
                <Link to={"contact"}>Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
