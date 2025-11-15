import { Router } from "express";
import { body } from "express-validator";
import { protect } from "../middleware/auth";
import { runValidation } from "../middleware/validate";
import {
  crearTarea,
  listarTareas,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/task.controller";

const router = Router();

router.post(
  "/",
  protect,
  [body("description").isString().notEmpty()],
  runValidation,
  crearTarea
);
router.get("/", protect, listarTareas);
router.patch("/:id", protect, actualizarTarea);
router.delete("/:id", protect, eliminarTarea);

export default router;
