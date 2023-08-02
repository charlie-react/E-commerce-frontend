import React, { useState } from "react";
// import SignUpLogo from "../assets/login-animation-new.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../utility/img-base64";
import { toast } from "react-hot-toast";
import axios from "axios"

const SignUp = () => {
  const navigation = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilepic: "",
  });
  const SignUpLogo =  ` ${process.env.PUBLIC_URL}/assets/login-animation-new.gif` 
  // const [collectInfo, setCollectInfo] = useState([]);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleShowPassConfirm = () => {
    setShowPassConfirm(!showPassConfirm);
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const handleProfilePicUpload = async (e) => {
    // console.log(e.target.files[0]);
    const image = await imageToBase64(e.target.files[0]);
    setLoginInfo((prevState) => {
      return {
        ...prevState,
        profilepic: image,
      };
    });
  };
  console.log(process.env.REACT_APP_DOMAIN);

  const submitInfo = async (e) => {
    e.preventDefault();
    if (
      loginInfo.firstname &&
      loginInfo.password &&
      loginInfo.confirmpassword &&
      loginInfo.email
    ) {
      if (loginInfo.password === loginInfo.confirmpassword) {
        try {
          const {data} = await axios.post(
            `${process.env.REACT_APP_DOMAIN}/signup`,
            loginInfo,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          
          console.log(data.user);
  
          // alert(dataResponse.msg);
          toast(data.msg);
          // const newUser = { ...loginInfo, id: new Date().getTime().toString() };
          // setCollectInfo([...collectInfo, newUser]);
          if (data.alert) {
            navigation('/login');
          }
        } catch (error) {
          toast(error.response.data.msg);
        }
      } else {
        toast('passwords do not match');
      }
    } else {
      toast('please enter required fields');
    }
  };
  // usin fetch api
  // const submitInfo = async (e) => {
  //   e.preventDefault();
  //   if (
  //     loginInfo.firstname &&
  //     loginInfo.password &&
  //     loginInfo.confirmpassword &&
  //     loginInfo.email
  //   ) {
  //     if (loginInfo.password === loginInfo.confirmpassword) {
  //       const fetchData = await fetch(
  //         `${process.env.REACT_APP_DOMAIN}/signup`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify(loginInfo),
  //         }
  //       );

  //       const dataResponse = await fetchData.json();
  //       console.log(dataResponse.user);

  //       // alert(dataResponse.msg);
  //       toast(dataResponse.msg)
  //       // const newUser = { ...loginInfo, id: new Date().getTime().toString() };
  //       // setCollectInfo([...collectInfo, newUser]);
  //       if(dataResponse.alert){
  //         navigation("/login");
  //       }
       
  //     } else {
  //       toast("passwords do not match");
  //     }
  //   } else {
  //     toast("please enter required fields");
  //   }
  // };
  return (
    <div className="p-3 md:p-4">
      <div className="bg-white m-auto max-w-sm w-full flex items-center flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold">SignUp</h1> */}
        <div className="w-20 h-20 rounded-full shadow-md drop-shadow-md overflow-hidden relative cursor-pointer ">
          <img
            src={loginInfo.profilepic ? loginInfo.profilepic : SignUpLogo}
            alt="sign-up"
            className="w-full h-full text-center mb-1"
          />
          <label htmlFor="ProfilePic">
            <div className="absolute bg-red-500 bg-opacity-80 h-1/3 text-white bottom-0 w-full text-center  ">
              <p className="text-sm cursor-pointer">Upload</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="ProfilePic"
              onChange={handleProfilePicUpload}
            />
          </label>
        </div>
        <form className="w-full mt-2" onSubmit={submitInfo}>
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="mt-2  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300"
            value={loginInfo.firstname}
            onChange={handleLogIn}
          />
          <label htmlFor="lasttname">LastName</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="mt-2 w-full bg-slate-200 px-2 py-1 rounded  focus:outline-blue-300"
            value={loginInfo.lastname}
            onChange={handleLogIn}
          />
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
              id="email"
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
          {/* confirm password */}
          <label htmlFor="confirmpassword">Confirm Password</label>

          <div className="flex bg-slate-200 mt-2  mb-2 px-2 py-1 rounded focus-within:outline   focus-within:outline-blue-300 ">
            <input
              type={showPassConfirm ? "text" : "password"}
              name="confirmpassword"
              id="email"
              className=" w-full  bg-slate-200 border-none outline-none"
              value={loginInfo.confirmpassword}
              onChange={handleLogIn}
            />
            <span
              className="cursor-pointer flex text-xl"
              onClick={handleShowPassConfirm}
            >
              {showPassConfirm ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {/* button */}
          <button
            type="submit"
            className="align-center justify-center w-full max-w-[120px] flex m-auto bg-red-500 hover:bg-red-600 text-xl py-1 px-2 rounded mt-4 text-white  rounded "
          >
            SignUp
          </button>
          <p className="text-sm  mt-3">
            Already have an account?
            <Link to={"/login"} className="text-red-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
