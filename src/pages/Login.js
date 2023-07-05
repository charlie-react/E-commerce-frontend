import React from "react";
// import SignUpLogo from "../assets/login-animation-new.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  // const SignUpLogo = `${process.env.PUBLIC_URL}/assets/login-animation-new.gif`
  const navigate = useNavigate();
  // const userData = useSelector(state=>state)
  // console.log(userData)

  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  const submitInfo = async (e) => {
    e.preventDefault();
    if (
      (loginInfo.password && loginInfo.email) ||
      !loginInfo.password ||
      !loginInfo.email
    ) {
      const fetchData = await fetch(`${process.env.REACT_APP_DOMAIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const dataResponse = await fetchData.json();
      console.log(dataResponse.msg, dataResponse.returnedKeys);
      if (dataResponse.returnedKeys) {
        toast(`${dataResponse.msg},` + dataResponse.returnedKeys.firstname);
      } else {
        toast(dataResponse.msg);
      }

      if (dataResponse.alert) {
        dispatch(loginRedux(dataResponse));
        navigate("/");
      }
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="bg-white m-auto max-w-sm w-full flex items-center flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold">SignUp</h1> */}
        <div className="w-20 rounded-full shadow-md drop-shadow-md overflow-hidden  ">
          <img
            src={`${process.env.PUBLIC_URL}/assets/login-animation-new.gif`}
            alt="sign-up"
            className="w-full  text-center"
          />
        </div>
        <form className="w-full mt-2" onSubmit={submitInfo}>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2  mb-2 w-full bg-slate-200 px-2 py-1 rounded  focus:outline-blue-300"
            value={loginInfo.email}
            onChange={handleLogIn}
          />
          {/* Password */}
          <label htmlFor="password">Password</label>

          <div className="flex bg-slate-200 mt-2  mb-2 px-2 py-1 rounded focus-within:outline  focus-within:outline-blue-300 ">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              className=" w-full  bg-slate-200 border-none outline-none"
              value={loginInfo.password}
              onChange={handleLogIn}
            />
            <span
              className="cursor-pointer flex text-xl"
              onClick={handleShowPass}
            >
              {showPass ? <BiShow /> : <BiHide />}
            </span>
          </div>

          {/* button */}
          <button
            type="submit"
            className="align-center justify-center w-full max-w-[120px] flex m-auto bg-red-500 hover:bg-red-600 text-xl py-1 px-2 rounded mt-4 text-white  rounded-full"
          >
            Login
          </button>
          <p className="text-sm  mt-3">
            Forgot Password?
            <Link to={"/login"} className="text-red-500 underline">
              Click
            </Link>
          </p>
          <p className="text-sm  mt-3">
            Don't have an account yet?
            <Link to={"/signup"} className="text-green-600 underline">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
