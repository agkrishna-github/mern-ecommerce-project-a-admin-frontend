import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  images: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const uploadImg = createAsyncThunk(
  "images/uploadImg",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      const response = await axios.post(`${base_url}upload/`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const delImg = createAsyncThunk(
  "images/delImg",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}upload/delete-img/${id}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const imgSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default imgSlice.reducer;
