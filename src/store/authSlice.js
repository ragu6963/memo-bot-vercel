import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/index";

const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        url: `/auth/v1/signup`,
        method: "POST",
        data: {
          email: data["email"],
          password: data["password"],
        },
      };
      const response = await axiosInstance(config);
      return response["data"];
    } catch (error) {
      return rejectWithValue(error["response"]["data"]);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        url: `/auth/v1/token?grant_type=password`,
        method: "POST",
        data: {
          email: data["email"],
          password: data["password"],
        },
      };
      const response = await axiosInstance(config);
      return response["data"];
    } catch (error) {
      return rejectWithValue(error["response"]["data"]);
    }
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        url: `/auth/v1/logout`,
        method: "POST",
      };
      const response = await axiosInstance(config);
      return response["data"];
    } catch (error) {
      return rejectWithValue(error["response"]["data"]);
    }
  }
);

const initialState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload["access_token"];
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.token = null;
          state.error = action.payload;
        }
      );
  },
});

export { signup, login, logout };
export default authSlice.reducer;
