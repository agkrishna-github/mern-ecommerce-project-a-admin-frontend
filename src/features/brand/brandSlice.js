import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { useSelector } from "react-redux";

const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (newBrand, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}brand/`, newBrand);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getallBrands = createAsyncThunk(
  "brand/getallBrands",
  async (newBrand, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}brand/`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const delteBrand = createAsyncThunk(
  "brand/delteBrand",
  async (brandId, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}brand/${brandId}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ brandId, title }, thunkAPI) => {
    try {
      const response = await axios.put(`${base_url}brand/${brandId}`, {
        title,
      });
      return;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getallBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getallBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
      })
      .addCase(delteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const selectAllBrands = (state) => state.brand.brands;

export default brandSlice.reducer;
