import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loginStatus : false,
}

const loginSlice = createSlice({
    name : "login",
    initialState : INITIAL_STATE,
    reducers : {
        logIn : (state) => {
            state.loginStatus = true
        },
        logOut : (state) => {
            state.loginStatus = false
        },
    } 
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice.reducer;
