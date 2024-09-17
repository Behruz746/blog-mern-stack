import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const { data } = await axios.get("posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {},
  },
  extraReducers: (builder) => {
    // loading
    builder.addCase(fetchPosts.pending, (state, _) => {
      state.posts.status = "loading";
    });

    // resolved
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "resolved";
    });

    // error
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    });
  },
});

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
