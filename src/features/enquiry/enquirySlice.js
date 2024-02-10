import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const initialState = {
  enquiries: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllEnquiries = createAsyncThunk(
  "enquiries/getAllEnquiries",
  async (enq, thunkAPI) => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
  }
);

const enquirySchema = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default enquirySchema.reducer;
