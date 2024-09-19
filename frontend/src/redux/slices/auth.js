import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  try {
    const { data } = await axios.post("auth/login", params);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    try {
      const { data } = await axios.post("auth/register", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  try {
    const { data } = await axios.get("auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// statuses
const handlePending = (state) => {
  state.status = "loading";
  state.data = null;
};

const handleFulfilled = (state, action) => {
  state.data = action.payload;
  state.status = "resolved";
};

const handleRejected = (state) => {
  state.data = null;
  state.status = "error";
};

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // user logout
    logout: (state, _) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    const cases = [fetchAuth, fetchAuthMe, fetchRegister];

    cases.forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
