import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // tokenda bor bo'lsa token ichidan Bearer degan text remove bo'lsin
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "darkUser2005");
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
