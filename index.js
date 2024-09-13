import express from "express";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserConrtoller from "./controller/UserController.js";
import * as PostController from "./controller/PostController.js";

let PASSWORD = "t4DEW7LeoMEWK0iF";
mongoose
  .connect(
    `mongodb+srv://madaminovbehruz746:${PASSWORD}@cluster0.26mcl.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch(() => {
    console.log("DB err");
  });

const app = express();

// express json malumotlarni o'qishi uchun
app.use(express.json());

// <----------------- USER ----------------
// LOGIN
app.post("/auth/login", loginValidation, UserConrtoller.login);
// REGISTER
app.post("/auth/register/", registerValidation, UserConrtoller.register);
// GET ME
app.get("/auth/me", checkAuth, UserConrtoller.getMe);
// ----------------- USER ---------------->

// <----------------- POST ----------------
// CREATE
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
// GET ALL
app.get("/posts", PostController.getAll);
// GET ONE
app.get("/posts/:id", PostController.getOne);
// DELETE
app.delete("/posts/:id", PostController.remove);
// UPDATE
// app.patch('/posts', PostController.update)
// ----------------- POST ---------------->

// serverni run qilish va port malumotlari
app.listen(4444, (err) => {
  if (err) console.log(err);

  console.log("Server: OK;");
});
