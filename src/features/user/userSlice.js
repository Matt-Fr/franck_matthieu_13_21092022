import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
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

export const getUser = createAsyncThunk(
  "user/profile",
  async (token, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        "/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(resp);

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
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.body;
      addUserToLocalStorage(payload.body);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export default userSlice.reducer;
