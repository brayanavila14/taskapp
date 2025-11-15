import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller";
import { runValidation } from "../middleware/validate";
import { generalLimiter } from "../middleware/rateLimiter";

const router = Router();

const usernameValidation = body("username")
  .isString()
  .trim()
  .isLength({ min: 3 })
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("El username solo puede tener letras, números o guiones bajos");

const nameValidation = body("name")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("El nombre es obligatorio");

const passwordValidation = body("password")
  .isString()
  .isLength({ min: 5 })
  .withMessage("La contraseña debe tener al menos 5 caracteres");

router.post(
  "/register",
  generalLimiter,
  [usernameValidation, nameValidation, passwordValidation],
  runValidation,
  register
);

router.post(
  "/login",
  generalLimiter,
  [usernameValidation, passwordValidation],
  runValidation,
  login
);

export default router;
