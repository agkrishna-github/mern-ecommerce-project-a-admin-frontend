import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  homeDetails: [],
  homeSubDetails: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const uploadHomePageDetails = createAsyncThunk(
  "homepage/uploadHomePageDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}homepage/upload-details`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadHomePagesubDetails = createAsyncThunk(
  "homepage/uploadHomePagesubDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}homepage/upload-sub-details`,
        data
      );
      console.log(response.data);
      // return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadHomePageDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadHomePageDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.homeImages = action.payload;
      })
      .addCase(uploadHomePageDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(uploadHomePagesubDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadHomePagesubDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.homeSubDetails = action.payload;
      })
      .addCase(uploadHomePagesubDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default homePageSlice.reducer;
