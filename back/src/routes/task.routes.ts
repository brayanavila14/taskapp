import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  crearTarea,
  listarTareas,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/task.controller.js";
import { body } from "express-validator";
import { runValidation } from "../middleware/validate.js";

const router = Router();

router.post(
  "/",
  protect,
  [body("nombre").isString().notEmpty()],
  runValidation,
  crearTarea
);

router.get("/", protect, listarTareas);

// ✏️ Actualizar tarea
router.put("/:id", protect, actualizarTarea);

// ❌ Eliminar tarea
router.delete("/:id", protect, eliminarTarea);

export default router;
