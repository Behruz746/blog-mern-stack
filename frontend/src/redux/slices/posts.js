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

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  try {
    const { data } = await axios.get("tags");
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
    // POSTS
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
    builder.addCase(fetchPosts.rejected, (state, _) => {
      state.posts.items = [];
      state.posts.status = "error";
    });

    // TAGS
    // loading
    builder.addCase(fetchTags.pending, (state, _) => {
      state.tags.status = "loading";
    });

    // resolved
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "resolved";
    });

    // error
    builder.addCase(fetchTags.rejected, (state, _) => {
      state.tags.items = [];
      state.tags.status = "error";
    });
  },
});

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
