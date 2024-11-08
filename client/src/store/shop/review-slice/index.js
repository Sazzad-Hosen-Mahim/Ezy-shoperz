import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addNewReview = createAsyncThunk(
  "/review/addReview",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      formData
    );
    return response?.data;
  }
);

export const getReviews = createAsyncThunk("/review/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/review/${id}`
  );
  return response?.data;
});

const shopReviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default shopReviewSlice.reducer;