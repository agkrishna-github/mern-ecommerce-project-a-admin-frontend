import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  blogCategories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBlogCategory = createAsyncThunk(
  "blogCategories/createBlogCategory",
  async (bCategory, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const response = await axios.post(`${base_url}blogCategory/`, bCategory, {
        headers: {
          Authorization: `Bearer ${auth?.user?.token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogCategories = createAsyncThunk(
  "blogCategories/getAllBlogCategories",
  async (bCategory, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const response = await axios.get(`${base_url}blogCategory/`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleBcategory = createAsyncThunk(
  "blogCategories/deleBcategory",
  async (id, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const response = await axios.delete(`${base_url}blogCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCat = createAsyncThunk(
  "blogCategories/updateBlogCat",
  async (blogcat, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const response = await axios.put(
        `${base_url}blogCategory/${blogcat.id}`,
        { title: blogcat.title },
        {
          headers: {
            Authorization: `Bearer ${auth?.user?.token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogCategories = action.payload;
      })
      .addCase(getAllBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleBcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleBcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBCategory = action.payload;
      })
      .addCase(deleBcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogCategorySlice.reducer;
