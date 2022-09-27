import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const registerUser = createAsyncThunk("user/registered");

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
