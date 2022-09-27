import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";

const initialState = {
  user: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/user/login", user);
      console.log(resp);
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
