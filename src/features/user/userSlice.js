import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import customFetch from "../../utils/axios";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  authToken: getTokenFromLocalStorage(),
};

export const authLoginUser = createAsyncThunk(
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
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

//a mettre à jour
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (token, inputUser, thunkAPI) => {
    try {
      const resp = await customFetch.put("/user/profile", inputUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(resp);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.authToken = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
    },
  },
  extraReducers: {
    [authLoginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [authLoginUser.fulfilled]: (state, { payload }) => {
      //payload is what we obtain in the return in the asyncthunk
      state.isLoading = false;
      state.authToken = payload.body.token;
      addTokenToLocalStorage(payload.body.token);
    },
    [authLoginUser.rejected]: (state, { payload }) => {
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
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
