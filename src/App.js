import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setProductData } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  // useEffect(() => {
  //   (async () => {
  //     const fetchDataNew = await fetch(`${process.env.REACT_APP_DOMAIN}/products`);
  //     const dataResponseNew = await fetchDataNew.json();
  //     console.log(dataResponseNew);
  //     dispatch(setProductData(dataResponseNew))
  //   })();
  // }, []);
 
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
