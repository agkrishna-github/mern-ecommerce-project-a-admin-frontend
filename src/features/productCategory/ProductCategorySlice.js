import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  pCategories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createPcategory = createAsyncThunk(
  "pCategory/createPcategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}category/`, category);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllPcategories = createAsyncThunk(
  "pCategory/getAllPcategories",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}category/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePcategory = createAsyncThunk(
  "pCategory/updatePcategory",
  async (category, thunkAPI) => {
    console.log(category);
    try {
      const response = await axios.put(`${base_url}category/${category._id}`, {
        title: category.title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePcategory = createAsyncThunk(
  "pCategory/deletePcategory",
  async (catId, thunkAPI) => {
    try {
      const deletedCat = await axios.delete(`${base_url}category/${catId}`);
      return deletedCat.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const pCategorySlice = createSlice({
  name: "pCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPcategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pCategories = [...state.pCategories, action.payload];
      })
      .addCase(createPcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllPcategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pCategories = action.payload;
      })
      .addCase(getAllPcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deletePcategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deletePcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updatePcategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updatePcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default pCategorySlice.reducer;
