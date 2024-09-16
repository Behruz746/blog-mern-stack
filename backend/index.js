import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validation.js";
import { UserController, PostController } from "./controller/index.js";
import { handlerValidationErrors, checkAuth } from "./utils/index.js";

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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// express json malumotlarni o'qishi uchun
app.use(express.json());
// imagelarni route qilish uchun
app.use("/uploads", express.static("uploads"));
app.use(cors());

// <----------------- USER ----------------
// LOGIN
app.post(
  "/auth/login",
  loginValidation,
  handlerValidationErrors,
  UserController.login
);
// REGISTER
app.post(
  "/auth/register",
  registerValidation,
  handlerValidationErrors,
  UserController.register
);
// GET ME
app.get("/auth/me", checkAuth, UserController.getMe);
// ----------------- USER ---------------->

// <----------------- UPLOAD ----------------
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
// ----------------- UPLOAD ---------------->

// <----------------- POST ----------------
// GET ALL
app.get("/posts", PostController.getAll);
// GET ONE
app.get("/posts/:id", PostController.getOne);
// DELETE
app.delete("/posts/:id", checkAuth, PostController.remove);
// UPDATE
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  PostController.update
);
// CREATE
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  PostController.create
);
// ----------------- POST ---------------->

// serverni run qilish va port malumotlari
app.listen(4444, (err) => {
  if (err) console.log(err);

  console.log("Server: OK;");
});
