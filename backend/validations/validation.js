import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов;").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  // body ichidagi email email bo'lishini tekshirish
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов;").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя:").isLength({ min: 3 }),
  body("avatarUrl", "Чеверная ссылка на аватарку!").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение")
    .optional({ min: 10 })
    .isString(),  
];
