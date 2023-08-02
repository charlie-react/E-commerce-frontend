import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  profilepic: "",
  _id: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
    
     
      const {
        payload: {
          returnedKeys: { firstname, lastname, email, _id, profilepic },
        },
      } = action;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state._id = _id;
      state.profilepic = profilepic;
    },
   logoutRedux:(state,action)=>{
    state.firstname="" 
    state.lastname="" 
    state.email="" 
    state._id="" 
    state.profilepic=""

   }
  },
});
export const { loginRedux,logoutRedux } = userSlice.actions;
export default userSlice.reducer;
