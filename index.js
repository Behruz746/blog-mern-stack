import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

let PASSWORD = "t4DEW7LeoMEWK0iF";

mongoose
  .connect(
    `mongodb+srv://madaminovbehruz746:${PASSWORD}@cluster0.26mcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
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

app.post("/auth/register/", registerValidation, (req, res) => {
  // req userdan kelgan malumot
  // res userga jo'natiladigan malumot
  const errors = validationResult(req);

  // agar serverda xato ketsa post bo'lganda status 400 bo'lib xatolar chiqadi
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

// serverni run qilish va port malumotlari
app.listen(4444, (err) => {
  if (err) console.log(err);

  console.log("Server: OK;");
});
