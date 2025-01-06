/** @format */

import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: savedToken ? true : false,
  },
  reducers: {
    LOGIN: (state, action) => {
      const token = action.payload?.data?.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    LOGOUT: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
