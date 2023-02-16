import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userDetails: {
    name: "",
    email: "",
    role: "",
    dateLoggedIn: "",
    dateLoggedOut: "",
  },
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: INITIAL_STATE,
  reducers: {
    updateUserDetailsOnIn: (state, action) => ({
      userDetails: {
        ...state.userDetails,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        dateLoggedIn:new Date(),
      },
    }),
    updateUserDetailsOnOut: (state, action) => ({
      userDetails: {
        ...state.userDetails,
        dateLoggedOut:new Date(),
      },
    }),
  },
});

export const { updateUserDetailsOnIn, updateUserDetailsOnOut } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
