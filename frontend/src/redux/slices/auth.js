import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params) => {
    try {
      const { data } = await axios.post("auth/login", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loading
    builder.addCase(fetchAuth.pending, (state, _) => {
      state.status = "loading";
      state.data = null;
    });

    // resolved
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "resolved";
    });

    // error
    builder.addCase(fetchAuth.rejected, (state, _) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export const authReducer = authSlice.reducer;
