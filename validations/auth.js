import { body } from "express-validator";

export const registerValidation = [
  // body ichidagi email email bo'lishini tekshirish
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов;").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя:").isLength({ min: 3 }),
  body("avatarUrl", "Чеверная ссылка на аватарку!").optional().isURL(),
];
