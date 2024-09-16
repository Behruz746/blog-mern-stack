import { createSlice } from "@reduxjs/toolkit";

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
});

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
