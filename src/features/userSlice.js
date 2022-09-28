import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import customFetch from "../utils/axios";

const initialState = {
  user: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const resp = await customFetch.post("/user/login", user);
      console.log(resp);
      const token = resp.data.body.token;
      console.log(token);
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
