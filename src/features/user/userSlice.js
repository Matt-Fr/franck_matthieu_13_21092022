import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  user: null,
  authToken: "",
  isMember: true,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      console.log(`ce qu'on va balancer au serveur ${JSON.stringify(user)}`);
      const resp = await customFetch.post("/user/login", user);
      console.log(resp);
      const token = resp.data.body.token;
      localStorage.setItem("userToken", token);
      console.log(user);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
