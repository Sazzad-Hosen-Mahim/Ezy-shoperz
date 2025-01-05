import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async () => {
    const response = await axios.get(`${apiBaseUrl}/api/common/feature/get`);

    return response?.data;
  }
);

export const addFeatureImages = createAsyncThunk(
  "/feature/addFeatureImages",
  async (image) => {
    const response = await axios.post(`${apiBaseUrl}/api/common/feature/add`, {
      image,
    });

    return response?.data;
  }
);

const commonFeatureSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action?.payload?.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonFeatureSlice.reducer;
