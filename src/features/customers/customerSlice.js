import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  customers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}user/all-users`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default customerSlice.reducer;
