import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User.js";
import checkAuth from "./utils/checkAuth.js";

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

// LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    // req userdan kelgan malumot
    // res userga jo'natiladigan malumot
    // user data base dan topish
    const user = await UserModel.findOne({ email: req.body.email });

    // agar user data base dan topilmasa 404 hato return bo'ladi
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    // agar password user va data baseniki to'g'ri kelishini tekshirish
    const isValidaPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    // agar isValidaPass false bo'lse hato message return bo'lsin
    if (!isValidaPass) {
      return res.status(400).json({
        message: "Певерный логин или Пароль",
      });
    }

    // JWToken yaratish user idsi dan va 30 kun expiresIn bo'lishi
    const token = jwt.sign({ _id: user._id }, "darkUser2005", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
});

// REGISTER
app.post("/auth/register/", registerValidation, async (req, res) => {
  try {
    // req userdan kelgan malumot
    // res userga jo'natiladigan malumot
    const errors = validationResult(req);

    // agar serverda xato ketsa post bo'lganda status 400 bo'lib xatolar chiqadi
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    // passowrdni shifravat qilish
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // register obttuzulishi
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    // JWToken yaratish user idsi dan va 30 kun expiresIn bo'lishi
    const token = jwt.sign({ _id: user._id }, "darkUser2005", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "пользователь не найден" });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Нет доступа" });
  }
});

// serverni run qilish va port malumotlari
app.listen(4444, (err) => {
  if (err) console.log(err);

  console.log("Server: OK;");
});
