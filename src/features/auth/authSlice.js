import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const adminlogin = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}user/admin-login`, user);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/get-orders",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}user/getallorders`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminlogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
