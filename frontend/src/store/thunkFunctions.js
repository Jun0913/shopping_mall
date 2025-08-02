import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/register`, body);
      console.log("✅ registerUser response:", response.data); // ✅ 디버깅
      return response.data;
    } catch (error) {
      console.error("❌ registerUser error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/logout`);
      console.log("✅ logoutUser response:", response.data); // ✅ 디버깅
      return response.data;
    } catch (error) {
      console.error("❌ logoutUser error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, body);
      console.log("✅ loginUser response:", response.data); // ✅ 디버깅
      return response.data;
    } catch (error) {
      console.error("❌ loginUser error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
