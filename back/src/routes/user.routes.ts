import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  listarUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", protect, isAdmin, listarUsuarios);
router.put("/:id", protect, isAdmin, actualizarUsuario);
router.delete("/:id", protect, isAdmin, eliminarUsuario);

export default router;
