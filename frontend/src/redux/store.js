import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

const store = configureStore({
  reducer: { postsReducer },
  devTools: process.env.NODE_ENV !== "production", // for redux dev tool
});

export default store;
