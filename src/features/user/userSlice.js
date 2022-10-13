import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  isNameFormOpen: false,
};

export const authLoginUser = createAsyncThunk(
  "user/authLogin",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/user/login", user);
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ authToken, userData }, thunkAPI) => {
    try {
      const resp = await customFetch.put("/user/profile", userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
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
    toggleNameForm: (state) => {
      state.isNameFormOpen = !state.isNameFormOpen;
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
      state.user.firstName = payload.body.firstName;
      state.user.lastName = payload.body.lastName;
      addUserToLocalStorage(payload.body);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export const { logoutUser, toggleNameForm } = userSlice.actions;
export default userSlice.reducer;
