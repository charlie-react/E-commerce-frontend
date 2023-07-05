import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  productList: [],
  cartList: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productList = [...action.payload];
    },
    addItem: (state, action) => {
      let total = action.payload.price;

      const checkProduct = state.cartList.some(
        (el) => el.id === action.payload.id
      );
      console.log(checkProduct);
      if (!checkProduct) {
        state.cartList = [
          ...state.cartList,
          { ...action.payload, qty: 1, total },
        ];
      } else {
        toast("Item already added to cart");
      }
    },
    deleteItem: (state, action) => {
      console.log(action.payload);
      toast("Item deleted");
      const index = state.cartList.findIndex((el) => el.id === action.payload);
      state.cartList.splice(index, 1);
      console.log(index);
    },
    increaseQuantity: (state, action) => {
      const { cartList } = state;
      const index = cartList.findIndex((el) => el.id === action.payload);
      let quantity = cartList[index].qty;
      console.log(quantity);
      cartList[index].qty = quantity + 1;
      console.log(cartList[index].qty);
      
      cartList[index].total =   cartList[index].total +   cartList[index].price

    },
    decreaseQuantity: (state, action) => {
      const { cartList } = state;
      const index = cartList.findIndex((el) => el.id === action.payload);
      let quantity = cartList[index].qty;
      console.log(quantity);
      if (!quantity < 1) {
        cartList[index].qty = quantity - 1;
      }
      if (quantity === 1) {
        state.cartList.splice(index, 1);
      }
      cartList[index].total= cartList[index].total - cartList[index].price
    },
  },
});

export const {
  setProductData,
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;

export default productSlice.reducer;
