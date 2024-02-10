import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  blogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createblog = createAsyncThunk(
  "blogs/createblog",
  async (newBlog, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}blog/`, newBlog);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (newBlog, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}blog/`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}blog/${id}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (updateBlog, thunkAPI) => {
    console.log(updateBlog);
    try {
      const response = await axios.put(`${base_url}blog/${updateBlog.id}`, {
        title: updateBlog.title,
        category: updateBlog.category,
        description: updateBlog.description,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs.push(action.payload);
      })
      .addCase(createblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
