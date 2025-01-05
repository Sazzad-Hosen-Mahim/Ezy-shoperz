import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

const apiBaseUrl = import.meta.env.VITE_API_URL;

// async thunk add products
export const addNewProduct = createAsyncThunk(
  "/products/addNewProducts",
  async (formData) => {
    const result = await axios.post(
      `${apiBaseUrl}/api/admin/products/add-product`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);

// fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${apiBaseUrl}/api/admin/products/fetch-products`
    );
    return result.data;
  }
);

// update a product

export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${apiBaseUrl}/api/admin/products/update-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//  delete a product

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${apiBaseUrl}/api/admin/products/delete-product/${id}`
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
