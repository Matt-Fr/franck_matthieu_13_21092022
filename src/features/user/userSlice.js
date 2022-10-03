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
      console.log(initialState);
      console.log(`ce qu'on va balancer au serveur ${JSON.stringify(user)}`);
      const resp = await customFetch.post("/user/login", user);
      console.log(resp);
      // const token = resp.data.body.token;
      // localStorage.setItem("userToken", token);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      //payload is what we obtain in the return in the asyncthunk
      state.isLoading = false;
      state.authToken = payload.body.token;
      alert(state.authToken);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export default userSlice.reducer;
